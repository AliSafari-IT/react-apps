using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace next_api.Model
{
    public class SaveDataModel
    {
        public string IdObject { get; set; }
        public List<WeatherData> WData { get; set; }

        public SaveDataModel()
        {
            IdObject = Guid.NewGuid().ToString();
        }
    }

}
