using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Models
{
    public class Schedule
    {
        [Key]
        public int schedule_id { get; set; }

        // Foreign key to AppUser (aspnetusers table)
        [ForeignKey("AppUser")]
        public string user_id { get; set; }
        public int number_slots { get; set; }
        public DateTime date { get; set; }

        // Need neto for connecting it to another table
        public AppUser AppUser { get; set; }
    }
}
