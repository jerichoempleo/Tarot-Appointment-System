namespace TarotAppointment.Dto
{
    public class AuthResponseDto
    {
        public string? Token { get; set; } = string.Empty;

        public IEnumerable<string> Roles { get; set; } //Parang kinukuha nya ung role table

        public bool IsSuccess { get; set; }
        public string? Message { get; set; }
    }
}
