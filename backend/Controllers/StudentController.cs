using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Asp.Models;

namespace React_Asp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public StudentController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [Route("GetStudent")]
        public async Task<IEnumerable<Student>> GetStudents()
        {
            return await _appDbContext.Student.ToListAsync();
        }

        [HttpPost]
        [Route("AddStudenttite")]
        public async Task<Student> AddStudent(Student objStudent)
        {
            _appDbContext.Student.Add(objStudent);
            await _appDbContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpPatch] //modifies a specific not all
        [Route("UpdateStudent/{id}")]
        public async Task<Student> UpdateStudent(Student objStudent)
        {
            _appDbContext.Entry(objStudent).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpDelete]
        [Route("DeleteStudent/{id}")] //This add a url name
        public bool DeleteStudent(int id)
        {
            bool a = false;
            var student = _appDbContext.Student.Find(id);
            if (student != null)
            {
                a = true;
                _appDbContext.Entry(student).State = EntityState.Deleted;
                _appDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;

        }
    }

}
