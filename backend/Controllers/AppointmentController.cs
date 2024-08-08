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
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public AppointmentController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        [Route("AddAppointment")]
        public async Task<IActionResult> AddAppointment([FromBody] AppointmentDto appointmentDto)
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
            var newAppointment = new Appointment
            {
                user_id = userId, // Use the authenticated user ID
                service_id = appointmentDto.service_id,
                schedule_id = appointmentDto.schedule_id,
                //date_appointment = appointmentDto.date_appointment,
                time_slot = appointmentDto.time_slot,
                //status = appointmentDto.status,
                AppUser = appUser
            };

            _appDbContext.Appointments.Add(newAppointment);
            await _appDbContext.SaveChangesAsync();

            // Data displays on the Swagger API
            var createdAppointmentDto = new AppointmentDto
            {
                appointment_id = newAppointment.appointment_id,
                service_id = newAppointment.service_id,
                schedule_id = newAppointment.schedule_id,
                //date_appointment = newAppointment.date_appointment,
                time_slot = newAppointment.time_slot,
                //status = newAppointment.status
            };

            return Ok(createdAppointmentDto);
        }

        //
        [HttpGet]
        [Route("GetAppointment")]
        public async Task<IActionResult> GetAppointments()
        {
            // Get the user ID from the current authenticated user's claims
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);


            // Display only the Users Appointment (Filtered per Account)
            var appointments = await _appDbContext.Appointments
                                                  .Where(a => a.user_id == userId)
                                                  .ToListAsync();

            // Map the Appointments to AppointmentDto
            var appointmentDtos = appointments.Select(a => new AppointmentDto
            {
                appointment_id = a.appointment_id,
                service_id = a.service_id,
                schedule_id = a.schedule_id,
                time_slot = a.time_slot

            }).ToList();

            // Response in the API
            var response = new
            {
                UserId = userId,
                Appointments = appointmentDtos
            };

            return Ok(response);
        }
    }
}
