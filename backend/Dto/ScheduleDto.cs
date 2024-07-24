using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TarotAppointment.Models;

namespace TarotAppointment.Dto
{
    public class ScheduleDto
    {
    
        public int schedule_id { get; set; }
        //public string user_id { get; set; }

        public string service_id { get; set; }

        public int number_slots { get; set; }
        public DateOnly date { get; set; }


    }
}
