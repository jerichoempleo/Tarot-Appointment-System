using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Models
{
    public class Schedule
    {
        [Key]
        public int schedule_id { get; set; }

        [ForeignKey("Admin")]
        public int admin_id { get; set; }
        public int number_slots { get; set; }
        public DateTime date { get; set; }

        // Need neto for connecting it to another table
        public Admin Admin { get; set; }
    }
}
