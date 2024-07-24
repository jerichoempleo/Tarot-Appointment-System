using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TarotAppointment.Dto;
using TarotAppointment.Models;

namespace TarotAppointment.Controllers
{
    [Authorize] //The need to use for token
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public ScheduleController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [Route("GetSchedule")]
        public async Task<IActionResult> GetSchedules()
        {
            // Get the user ID from the current authenticated user's claims
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Retrieve Schedules from the database
            var schedules = await _appDbContext.Schedules.ToListAsync();

            // Map the Schedules to ScheduleDto
            var scheduleDtos = schedules.Select(s => new ScheduleDto
            {
                schedule_id = s.schedule_id,
                //user_id = s.user_id,
                number_slots = s.number_slots,
                date = s.date
            }).ToList();


            // Response in the API
            var response = new
            {
                UserId = userId,
                Schedules = scheduleDtos
            };

            return Ok(response);
        }

        [HttpPost]
        [Route("AddSchedule")]
        public async Task<IActionResult> AddSchedule([FromBody] ScheduleDto scheduleDto)
        {
            // This code is getting the user_id through the login token
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated.");
            }

            // Check if the provided user_id corresponds to an existing AppUser
            var appUser = await _appDbContext.Users.FindAsync(userId);
            if (appUser == null)
            {
                return BadRequest("Invalid user_id provided.");
            }

            // Map ScheduleDto to Schedule entity
            var newSchedule = new Schedule
            {
                user_id = userId, // Use the authenticated user ID
                number_slots = scheduleDto.number_slots,
                date = scheduleDto.date,
                AppUser = appUser
            };

            _appDbContext.Schedules.Add(newSchedule);
            await _appDbContext.SaveChangesAsync();

            // Return the created ServiceDto
            var createdScheduleDto = new ScheduleDto
            {
                schedule_id = newSchedule.schedule_id,
              //  user_id = newSchedule.user_id,
                number_slots = newSchedule.number_slots,
                date = newSchedule.date
            };

            return Ok(createdScheduleDto);
        }

        [HttpPatch]
        [Route("UpdateSchedule/{schedule_id}")] //URL
        public async Task<IActionResult> UpdateSchedule(int schedule_id, [FromBody] ScheduleDto scheduleDto)
        {
            // Retrieve the current authenticated user's ID from the claims
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Find the existing Schedule
            var existingSchedule = await _appDbContext.Schedules.FindAsync(schedule_id);

            if (existingSchedule == null)
            {
                return NotFound("Schedule not found.");
            }

            // Update properties
            existingSchedule.number_slots = scheduleDto.number_slots;
            existingSchedule.date = scheduleDto.date ;
         

            await _appDbContext.SaveChangesAsync();

            // Prepare the response including the user's claims
            var response = new
            {
                UserId = currentUserId,
                UpdatedSchedule = new ScheduleDto
                {
                    schedule_id = existingSchedule.schedule_id,
                  //user_id = existingSchedule.user_id,
                    number_slots = existingSchedule.number_slots,
                    date = existingSchedule.date
                }
            };

            return Ok(response);
        }

        [HttpDelete]
        [Route("DeleteSchedule/{schedule_id}")] // This adds a URL name
        public async Task<IActionResult> DeleteSchedule(int schedule_id)
        {
            // Retrieve the current authenticated user's ID from the claims
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Find the Schedule to delete
            var schedule = await _appDbContext.Schedules.FindAsync(schedule_id);

            if (schedule == null)
            {
                return NotFound("schedule not found.");
            }

            // Delete the Schedule
            _appDbContext.Schedules.Remove(schedule);
            await _appDbContext.SaveChangesAsync();

            // Response in the API
            var response = new
            {
                UserId = currentUserId,
                ScheduleId = schedule_id,
                Message = "Schedule deleted successfully."
            };

            return Ok(response);
        }
    }
}
