using BrewerySearchMongo.Models;
using BrewerySearchMongo.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BrewerySearchMongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BreweriesController : ControllerBase
    {
        private readonly BreweryService _breweryService;

        public BreweriesController(BreweryService breweryService)
        {
            _breweryService = breweryService;
        }

        [HttpGet]
        public ActionResult<List<Brewery>> Get() =>
            _breweryService.Get();

        [HttpGet("{id:length(24)}", Name = "GetBrewery")]
        public ActionResult<Brewery> Get(string id)
        {
            var brewery = _breweryService.Get(id);

            if (brewery == null)
            {
                return NotFound();
            }

            return brewery;
        }

        [HttpPost]
        public ActionResult<Brewery> Create(Brewery brewery)
        {
            _breweryService.Create(brewery);

            return CreatedAtRoute("GetBrewery", new { id = brewery.Id.ToString() }, brewery);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Brewery breweryIn)
        {
            var brewery = _breweryService.Get(id);

            if (brewery == null)
            {
                return NotFound();
            }

            _breweryService.Update(id, breweryIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var brewery = _breweryService.Get(id);

            if (brewery == null)
            {
                return NotFound();
            }

            _breweryService.Remove(brewery.Id);

            return NoContent();
        }
    }
}