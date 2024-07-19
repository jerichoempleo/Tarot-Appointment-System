using Microsoft.EntityFrameworkCore;

namespace TarotAppointment.Models
{
    public class AppDbContext : DbContext
    {

            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
            {
            }
            //<Model Name> Database Name
            public DbSet<Student> Student { get; set; }
            public DbSet<Service> Services { get; set; }
            public DbSet<Admin> Admins { get; set; }
            public DbSet<Schedule> Schedules { get; set; }
            public DbSet<Client> Clients { get; set; }
            public DbSet<Appointment> Appointments { get; set; }
            public DbSet<Notification> Notifications { get; set; }
        //Adding a foreign key
        protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

            // Configure the relationship | Connecting it to another table

            // Services
            modelBuilder.Entity<Service>()
                .HasOne(s => s.Admin)
                .WithMany(a => a.Services)
                .HasForeignKey(s => s.admin_id)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            // Schedule
            modelBuilder.Entity<Schedule>()
                .HasOne(s => s.Admin)
                .WithMany(a => a.Schedules) // If there's a red line then there's missing code in Admin.cs
                .HasForeignKey(s => s.admin_id)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            // Messages
            modelBuilder.Entity<Message>()
                .HasOne(s => s.Admin)
                .WithMany(a => a.Messages) // If there's a red line then there's missing code in Admin.cs
                .HasForeignKey(s => s.admin_id)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            modelBuilder.Entity<Message>()
                .HasOne(s => s.Client)
                .WithMany(a => a.Messages) // If there's a red line then there's missing code in Client.cs
                .HasForeignKey(s => s.client_id)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            // Notification
            modelBuilder.Entity<Notification>()
                .HasOne(s => s.Client)
                .WithMany(a => a.Notifications) // If there's a red line then there's missing code in Client.cs
                .HasForeignKey(s => s.client_id)
                .OnDelete(DeleteBehavior.ClientSetNull); // I set it to ClientSetNull para mawala ung "foreign key constraint on table may cause cycles or multiple cascade paths"

            modelBuilder.Entity<Notification>()
                .HasOne(s => s.Admin)
                .WithMany(a => a.Notifications) // If there's a red line then there's missing code in Admin.cs
                .HasForeignKey(s => s.admin_id)
                .OnDelete(DeleteBehavior.ClientSetNull); // I set it to ClientSetNull para mawala ung "foreign key constraint on table may cause cycles or multiple cascade paths"

            modelBuilder.Entity<Notification>()
                .HasOne(s => s.Appointment)
                .WithMany(a => a.Notifications) // If there's a red line then there's missing code in Appointment.cs
                .HasForeignKey(s => s.appointment_id)
                .OnDelete(DeleteBehavior.ClientSetNull); // I set it to ClientSetNull para mawala ung "foreign key constraint on table may cause cycles or multiple cascade paths"

            // Appointment
            modelBuilder.Entity<Appointment>()
                .HasOne(s => s.Client)
                .WithMany(a => a.Appointments) // If there's a red line then there's missing code in Appointment.cs
                .HasForeignKey(s => s.client_id)
                .OnDelete(DeleteBehavior.ClientSetNull); // I set it to ClientSetNull para mawala ung "foreign key constraint on table may cause cycles or multiple cascade paths"

            modelBuilder.Entity<Appointment>()
                .HasOne(s => s.Service)
                .WithMany(a => a.Appointments) // If there's a red line then there's missing code in Appointment.cs
                .HasForeignKey(s => s.service_id)
                .OnDelete(DeleteBehavior.ClientSetNull); // I set it to ClientSetNull para mawala ung "foreign key constraint on table may cause cycles or multiple cascade paths"
        }

    }
}
