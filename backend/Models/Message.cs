using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Models
{
    public class Message
    {
        [Key]
        public int message_id { get; set; }

        [ForeignKey("Admin")]
        public int admin_id { get; set; }
        [ForeignKey("Client")]
        public int client_id { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }

        // Need neto for connecting it to another table
        public Admin Admin { get; set; }
        public Client Client { get; set; }
    }
}
