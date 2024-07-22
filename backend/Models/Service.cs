using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TarotAppointment.Models
{
    public class Service
    {
        [Key]
        public int service_id { get; set; }

        // Foreign key to AppUser (aspnetusers table)
        [ForeignKey("AppUser")]
        public string user_id { get; set; }
        public string service_name { get; set; }
        public string description { get; set; }
        public string price { get; set; }

        // Need neto for connecting it to another table
        //public Admin Admin { get; set; }

        // Navigation property to AppUser
        public AppUser AppUser { get; set; }

        public Appointment Appointment { get; set; }

        //Code for connecting in the AppDbContext Foreign Keys
        public ICollection<Appointment> Appointments { get; set; }
    }
}
