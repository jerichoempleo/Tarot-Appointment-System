using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TarotAppointment.Models
{
    public class Service
    {
        [Key]
        public int service_id { get; set; }

        [ForeignKey("Admin")]
        public int admin_id { get; set; }
        public string service_name { get; set; }
        public string description { get; set; }
        public string price { get; set; }

        // Need neto for connecting it to another table
        public Admin Admin { get; set; }
    }
}
