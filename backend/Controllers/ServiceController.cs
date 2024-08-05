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
    public class ServiceController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public ServiceController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [Route("GetService")]
        public async Task<IActionResult> GetServices()
        {
            // Get the user ID from the current authenticated user's claims
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Retrieve services from the database
            var services = await _appDbContext.Services.ToListAsync();

            // Map the services to ServiceDto
            var serviceDtos = services.Select(s => new ServiceDto
            {
                service_id = s.service_id,
                //user_id = s.user_id,
                service_name = s.service_name,
                description = s.description,
                price = s.price
            }).ToList();


            // Response in the API
            var response = new
            {
                UserId = userId,
                Services = serviceDtos
            };

            return Ok(response);
        }

        [HttpPost]
        [Route("AddService")]
        public async Task<IActionResult> AddService([FromBody] ServiceDto serviceDto)
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

            // Map ServiceDto to Service entity
            var newService = new Service
            {
                user_id = userId, // Use the authenticated user ID
                service_name = serviceDto.service_name,
                description = serviceDto.description,
                price = serviceDto.price,
                AppUser = appUser
            };

            _appDbContext.Services.Add(newService);
            await _appDbContext.SaveChangesAsync();

            // Data displays on the Swagger API
            var createdServiceDto = new ServiceDto
            {
                service_id = newService.service_id,
                //user_id = newService.user_id,
                service_name = newService.service_name,
                description = newService.description,
                price = newService.price
            };

            return Ok(createdServiceDto);
        }

        [HttpPatch]
        [Route("UpdateService/{service_id}")] //URL
        public async Task<IActionResult> UpdateService(int service_id, [FromBody] ServiceDto serviceDto)
        {
            // Retrieve the current authenticated user's ID from the claims
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Find the existing service
            var existingService = await _appDbContext.Services.FindAsync(service_id);

            if (existingService == null)
            {
                return NotFound("Service not found.");
            }

            // Update properties
            existingService.service_name = serviceDto.service_name;
            existingService.description = serviceDto.description;
            existingService.price = serviceDto.price;

            await _appDbContext.SaveChangesAsync();

            // Prepare the response including the user's claims
            var response = new
            {
                UserId = currentUserId,
                UpdatedService = new ServiceDto
                {
                    service_id = existingService.service_id,
                    //user_id = existingService.user_id,
                    service_name = existingService.service_name,
                    description = existingService.description,
                    price = existingService.price
                }
            };

            return Ok(response);
        }

        [HttpDelete]
        [Route("DeleteService/{service_id}")] // This adds a URL name
        public async Task<IActionResult> DeleteService(int service_id)
        {
            // Retrieve the current authenticated user's ID from the claims
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Find the service to delete
            var service = await _appDbContext.Services.FindAsync(service_id);

            if (service == null)
            {
                return NotFound("Service not found.");
            }

            // Delete the service
            _appDbContext.Services.Remove(service);
            await _appDbContext.SaveChangesAsync();

            // Response in the API
            var response = new
            {
                UserId = currentUserId,
                ServiceId = service_id,
                Message = "Service deleted successfully."
            };

            return Ok(response);
        }
    }
}
