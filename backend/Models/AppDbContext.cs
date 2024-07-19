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

        //Adding a foreign key
        protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

                // Configure the relationship | Connecting it to another table
                modelBuilder.Entity<Service>()
                    .HasOne(s => s.Admin)
                    .WithMany(a => a.Services)
                    .HasForeignKey(s => s.admin_id);

                modelBuilder.Entity<Schedule>()
                  .HasOne(s => s.Admin)
                  .WithMany(a => a.Schedules) //If theres a red line then theres missing code in Admin.cs
                  .HasForeignKey(s => s.admin_id);
        }

    }
}
