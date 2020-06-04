namespace BrewerySearchMongo.Models
{
    public class BreweryDBSettings : IBreweryDBSettings
    {
        public string BreweriesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IBreweryDBSettings
    {
        string BreweriesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
