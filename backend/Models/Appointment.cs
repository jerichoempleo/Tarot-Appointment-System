using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Models
{
    public class  Appointment
    {
        [Key]
        public int appointment_id { get; set; }
          // Foreign key to AppUser (aspnetusers table)
        [ForeignKey("AppUser")]
        public string user_id { get; set; }
        [ForeignKey("Service")]
        public int service_id { get; set; }

        //Kailangan ata madeserialize para maconvert into shit pero tignan kung di na need sa frontend basta iset lng format
        public DateOnly date_appointment { get; set; }
        public TimeOnly time_slot { get; set; }
        public int status { get; set; }


        // Need neto for connecting it to another table
        //public Client Client { get; set; }

        public AppUser AppUser { get; set; }
        public Service Service { get; set; }

        //Code for connecting in the AppDbContext Foreign Keys
        public ICollection<Notification> Notifications { get; set; }

        public ICollection<Service> Services { get; set; }
    }
}
