using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Models
{
    public class  Appointment
    {
        [Key]
        public int appointment_id { get; set; }
        [ForeignKey("Client")]
        public int client_id { get; set; }
        [ForeignKey("Service")]
        public int service_id { get; set; }
        public string date_appointment { get; set; }
        public string time_slot { get; set; }
        public int status { get; set; }


        // Need neto for connecting it to another table
        public Client Client { get; set; }
        public Service Service { get; set; }

        //Code for connecting in the AppDbContext Foreign Keys
        public ICollection<Notification> Notifications { get; set; }
    }
}
