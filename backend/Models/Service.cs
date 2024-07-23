using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TarotAppointment.Models
{
    public class Service
    {
        //Ganto pagkasunod sunod ng display sa system
        [Key]
        public int service_id { get; set; }

        [ForeignKey("AppUser")]
        public string user_id { get; set; }
        public string service_name { get; set; }
        public string description { get; set; }
        public string price { get; set; }

        // Navigation property to AppUser
        public AppUser AppUser { get; set; }

        //public Appointment Appointment { get; set; }

        ////Code for connecting in the AppDbContext Foreign Keys
        //public ICollection<Appointment> Appointments { get; set; }
    }
}
