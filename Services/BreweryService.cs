using BrewerySearchMongo.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace BrewerySearchMongo.Services
{
    public class BreweryService
    {
        private readonly IMongoCollection<Brewery> _breweries;

        public BreweryService(IBreweryDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _breweries = database.GetCollection<Brewery>(settings.BreweriesCollectionName);
        }

        public List<Brewery> Get() =>
            _breweries.Find(brewery => true).ToList();

        public Brewery Get(string id) =>
            _breweries.Find<Brewery>(brewery => brewery.Id == id).FirstOrDefault();

        public Brewery Create(Brewery brewery)
        {
            _breweries.InsertOne(brewery);
            return brewery;
        }

        public void Update(string id, Brewery breweryIn) =>
            _breweries.ReplaceOne(brewery => brewery.Id == id, breweryIn);

        public void Remove(Brewery breweryIn) =>
            _breweries.DeleteOne(brewery => brewery.Id == breweryIn.Id);

        public void Remove(string id) =>
            _breweries.DeleteOne(brewery => brewery.Id == id);
    }
}
