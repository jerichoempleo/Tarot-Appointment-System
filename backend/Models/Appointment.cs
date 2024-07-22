﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TarotAppointment.Models
{
    public class  Appointment
    {
        [Key]
        public int appointment_id { get; set; }
          // Foreign key to AppUser (aspnetusers table)
        [ForeignKey("AppUser")]
        public string user_id { get; set; }
        [ForeignKey("Service")]
        public int service_id { get; set; }
        public string date_appointment { get; set; }
        public string time_slot { get; set; }
        public int status { get; set; }


        // Need neto for connecting it to another table
        //public Client Client { get; set; }

        public AppUser AppUser { get; set; }
        public Service Service { get; set; }

        //Code for connecting in the AppDbContext Foreign Keys
        public ICollection<Notification> Notifications { get; set; }
    }
}
