using Microsoft.AspNetCore.Identity;

namespace TarotAppointment.Models
{
   
        public class AppUser : IdentityUser
        {
            public string? FullName { get; set; }
        }
  

}
