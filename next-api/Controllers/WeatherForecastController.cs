using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using next_api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace next_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new string[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IMongoCollection<SaveDataModel> _collection;

        public WeatherForecastController(IMongoClient client, ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
            var database = client.GetDatabase("reactDb");
            _collection = database.GetCollection<SaveDataModel>("WeatherData");
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveWeatherData([FromBody] SaveDataModel saveDataModel)
        {
            if (saveDataModel == null || saveDataModel.WData == null || saveDataModel.WData.Count == 0)
            {
                return BadRequest("No data provided");
            }

            try
            {
                saveDataModel.IdObject = ObjectId.GenerateNewId().ToString();
                await _collection.InsertOneAsync(saveDataModel);
                return Ok("Data saved successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

    }
}
