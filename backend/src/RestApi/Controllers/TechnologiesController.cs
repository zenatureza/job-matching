using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ApplicationCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TechnologiesController : ApiController
    {
        // GET: api/<TechnologiesController>
        [HttpGet]
        public async Task<IEnumerable<string>> Get(
            [FromQuery] string filter)
        {
            return await Mediator
                .Send(new GetTechnologiesByFilterQuery()
                {
                    Filter = filter
                });
        }

        // GET api/<TechnologiesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TechnologiesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TechnologiesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TechnologiesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
