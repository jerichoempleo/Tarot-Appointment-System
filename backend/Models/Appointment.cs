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
        public int number_slots { get; set; }
        public DateTime date { get; set; }

        // Need neto for connecting it to another table
        public Client Client { get; set; }
    }
}
