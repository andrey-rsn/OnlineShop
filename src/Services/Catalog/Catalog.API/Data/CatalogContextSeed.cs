using Catalog.API.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Catalog.API.Data
{
    public class CatalogContextSeed
    {
        public static void SeedData(IMongoCollection<Product> productCollection)
        {
            bool isExists = productCollection.Find(p => true).Any();

            if (!isExists)
            {
                productCollection.InsertManyAsync(GetPreconfiguredProducts());
            }
        }

        private static IEnumerable<Product> GetPreconfiguredProducts()
        {
            return new List<Product>()
            {
                new Product ()
                {
                    Id= Convert.ToString(ObjectId.GenerateNewId()),
                    Name="Test",
                    Price=2000,
                    Category="testing",
                    Description="test description",
                    Summary="123",
                    ImageFile="test.png"
                }
            };
            
        }
    }
}
