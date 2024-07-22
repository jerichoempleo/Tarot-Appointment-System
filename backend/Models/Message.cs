using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Models
{
    public class Message
    {
        [Key]
        public int message_id { get; set; }

        // Foreign key to AppUser (aspnetusers table)
        [ForeignKey("AppUser")]
        public string user_id { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }

        // Need neto for connecting it to another table
        //public Admin Admin { get; set; }
        //public Client Client { get; set; }
        public AppUser AppUser { get; set; }

    }
}
