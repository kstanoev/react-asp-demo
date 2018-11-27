using System;
using System.Collections.Generic;
using System.Linq;
using api.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CORS")]
    public class BartenderController : ControllerBase
    {
        readonly BeersDb _context;

        public BartenderController(BeersDb beersDb)
        {
            this._context = beersDb;

            if (_context.Beers.Count() == 0)
            {
                _context.Beers.Add(new Beer()
                {
                    Name = "Пиринско",
                    Quantity = 10
                });

                _context.Beers.Add(new Beer()
                {
                    Name = "Шуменско",
                    Quantity = 10
                });

                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<string> Get()
        {
            return "Server has started. To view the React app, go to http://localhost:3000/";
        }

        [HttpGet("beers")]
        public ActionResult<List<Beer>> GetBeers()
        {
            return _context.Beers.ToList();
        }

        [HttpPost("order")]
        public ActionResult<List<Beer>> Order(object order)
        {
            var json = JObject.Parse(order.ToString());
            var beerId = (long)json["id"];
            var orderQuantity = (int)json["quantity"];

            var beer = _context.Beers.Find(beerId);
            if (beer == null)
            {
                return NotFound();
            }

            beer.Quantity -= orderQuantity;
            _context.Beers.Update(beer);
            _context.SaveChanges();

            return _context.Beers.ToList();
        }
    }
}
