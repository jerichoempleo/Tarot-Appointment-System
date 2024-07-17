using Microsoft.EntityFrameworkCore;

namespace React_Asp.Models
{
    public class AppDbContext : DbContext
    {

            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
            {
            }
            public DbSet<Student> Student { get; set; }
        
    }
}
