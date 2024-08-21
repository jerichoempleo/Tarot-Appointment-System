namespace TarotAppointment.Dto
{
    public class AppointmentDto
    {
        public int appointment_id { get; set; }
        //public string user_id { get; set; }
        public int service_id { get; set; }
        
        public int? schedule_id { get; set; }
        public DateOnly? date_appointment { get; set; }
        public string time_slot { get; set; }
        
        public int status { get; set; }

        public string? user_fullname { get; set; }
    }
}
