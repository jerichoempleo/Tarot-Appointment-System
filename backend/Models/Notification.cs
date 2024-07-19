using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Models
{
    public class Notification
    {
        [Key]
        public int notification_id { get; set; }

        [ForeignKey("Admin")]
        public int admin_id { get; set; }
        [ForeignKey("Client")]
        public int client_id { get; set; }
        [ForeignKey("Appointment")]
        public int appointment_id { get; set; }
        public string description { get; set; }
        public DateTime date { get; set; }

        // Need neto for connecting it to another table
        public Admin Admin { get; set; }
        public Client Client { get; set; }
        public Appointment Appointment { get; set; }
    }
}
