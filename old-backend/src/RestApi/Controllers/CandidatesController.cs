using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationCore;
using ApplicationCore.Application.ViewModels;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ApiController
    {
        // GET: api/<CandidatesController>
        [HttpGet]
        public async Task<BestCandidatesVm> Get(
            [FromQuery] string city,
            [FromQuery] string experience,
            [FromQuery] string[] mainTechnologies,
            [FromQuery] string[] otherTechnologies)
        {
            return await Mediator
                .Send(new GetCandidatesQuery()
                {
                    City = city,
                    Experience = experience,
                    MainTechnologies = mainTechnologies,
                    OtherTechnologies = otherTechnologies
                });
        }

        // GET api/<CandidatesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CandidatesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CandidatesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CandidatesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
