﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TarotAppointment.Models
{
    //public class AppDbContext : DbContext
    public class AppDbContext : IdentityDbContext<AppUser>
    {

            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
            {
            }
            //<Model Name> Database Name
            public DbSet<Student> Student { get; set; }
            public DbSet<Service> Services { get; set; }
            public DbSet<Schedule> Schedules { get; set; }
            public DbSet<Appointment> Appointments { get; set; }
            public DbSet<Notification> Notifications { get; set; }
            public DbSet<Message> Messages { get; set; }

        //Adding a foreign key
        protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

            // Configure the relationship | Connecting it to another table

            // Services
            modelBuilder.Entity<Service>()
                .HasOne(s => s.AppUser)
                .WithMany()
                .HasForeignKey(s => s.user_id)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            // Schedule
            modelBuilder.Entity<Schedule>()
                .HasOne(s => s.AppUser)
                .WithMany()
                .HasForeignKey(s => s.user_id)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            // Messages
            modelBuilder.Entity<Message>()
                .HasOne(s => s.AppUser)
                .WithMany()
                .HasForeignKey(s => s.user_id)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

         
            // Notification
            modelBuilder.Entity<Notification>()
                .HasOne(s => s.AppUser)
                .WithMany()
                .HasForeignKey(s => s.user_id)
                .OnDelete(DeleteBehavior.ClientSetNull); // I set it to ClientSetNull para mawala ung "foreign key constraint on table may cause cycles or multiple cascade paths"

            modelBuilder.Entity<Notification>()
                .HasOne(s => s.Appointment)
                .WithMany(a => a.Notifications) // If there's a red line then there's missing code in Appointment.cs
                .HasForeignKey(s => s.appointment_id)
                .OnDelete(DeleteBehavior.ClientSetNull); // I set it to ClientSetNull para mawala ung "foreign key constraint on table may cause cycles or multiple cascade paths"

            // Appointment
            modelBuilder.Entity<Appointment>()
                .HasOne(s => s.AppUser)
                .WithMany() 
                .HasForeignKey(s => s.user_id)
                .OnDelete(DeleteBehavior.ClientSetNull); // I set it to ClientSetNull para mawala ung "foreign key constraint on table may cause cycles or multiple cascade paths"

           modelBuilder.Entity<Appointment>()
               .HasOne(a => a.Schedule)
               .WithMany() //  one Schedule can have multiple Appointments
               .HasForeignKey(a => a.schedule_id)
               .OnDelete(DeleteBehavior.ClientSetNull);

        }

    }
}
