using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Models
{
    public class Client
    {
        [Key]
        public int client_id { get; set; }

        [Required]
        public string given_name { get; set; }

        [Required]
        public string surname { get; set; }

        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "The password must be at least 6 characters long.")]
        public string password { get; set; }

        // Navigation property
        public ICollection<Appointment> Appointments { get; set; }
    }
}
