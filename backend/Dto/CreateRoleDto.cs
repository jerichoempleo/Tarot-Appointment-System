using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Dto
{
    public class CreateRoleDto
    {
        [Required(ErrorMessage = "Role Name is required.")]
        public string RoleName { get; set; } = null!;
    }
}
