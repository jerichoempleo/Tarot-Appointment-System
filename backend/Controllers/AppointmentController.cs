using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TarotAppointment.Dto;
using TarotAppointment.Models;

namespace TarotAppointment.Controllers
{
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
                date_appointment = appointmentDto.date_appointment,
                time_slot = appointmentDto.time_slot,
                status = appointmentDto.status,
                AppUser = appUser
            };

            _appDbContext.Appointments.Add(newAppointment);
            await _appDbContext.SaveChangesAsync();

            // Return the created ServiceDto
            var createdAppointmentDto = new AppointmentDto
            {
                appointment_id = newAppointment.appointment_id,
                //  user_id = newSchedule.user_id,
                service_id = newAppointment.service_id,
                date_appointment = newAppointment.date_appointment,
                time_slot = newAppointment.time_slot,
                status = newAppointment.status
            };

            return Ok(createdAppointmentDto);
        }
    }
}
