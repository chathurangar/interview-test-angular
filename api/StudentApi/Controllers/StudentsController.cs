using StudentApi.Mediatr.Students;
using StudentApi.Models.Students;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudentApi.Services;

namespace StudentApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentsController : ControllerBase
    {
        private IMediator mediator;

        /// <summary>
        /// Gets the Mediator object.
        /// </summary>
        protected IMediator Mediator => mediator ??= (IMediator)HttpContext.RequestServices.GetService(typeof(IMediator))!;

        private readonly ILogger<StudentsController> _logger;
        private readonly IStudentsService _studentService;

        public StudentsController(ILogger<StudentsController> logger, IStudentsService studentService)
        {
            _logger = logger;
            _studentService = studentService;
        }

        /// <summary>
        /// Gets the current students
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<Student>> Get()
        {
            var reponse = await Mediator.Send(new GetStudentsRequest());

            return reponse.Students;
        }

        [HttpPost]
        [Route("AddStudent")]
        public bool Post([FromBody]Student student)
        {
            return _studentService.AddStudent(student);
        }

        [HttpPost]
        [Route("DeleteStudent")]
        public bool Delete(Student student)
        {
            return _studentService.DeleteStudent(student);
        }
    }
}
