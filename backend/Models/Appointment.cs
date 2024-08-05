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
        [ForeignKey("Schedule")]
        public int schedule_id { get; set; }
        public DateOnly? date_appointment { get; set; }  // Nullable DateOnly
        public string time_slot { get; set; }
        public int status { get; set; }


        // Connecting Foreign Keys to another table 
        public AppUser AppUser { get; set; }
        public Schedule Schedule { get; set; }
        public Service Service { get; set; }

        //Code for connecting in the AppDbContext Foreign Keys | update: di ko nagets ano purpose neto
        public ICollection<Notification> Notifications { get; set; }

    
    }
}
