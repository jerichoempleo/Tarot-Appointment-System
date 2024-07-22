using Microsoft.AspNetCore.Identity;

namespace TarotAppointment.Models
{
   //This File is for the Users created from the identity
        public class AppUser : IdentityUser
        {
            public string? FullName { get; set; }
        }
  

}
