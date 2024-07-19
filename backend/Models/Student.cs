using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Models
{
    public class Student
    {
        [Key]
        public int student_id { get; set; }
        public string stname { get; set; }
        public string course { get; set; }
    }
}
