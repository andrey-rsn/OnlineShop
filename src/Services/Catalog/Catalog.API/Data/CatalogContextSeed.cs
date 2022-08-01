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
                    Name="Test1",
                    Price=2000,
                    Category="testing1",
                    Description="test description",
                    Summary="123",
                    ImageFile="https://cdn1.ozone.ru/s3/multimedia-0/wc1200/6082471680.jpg"
                },
                new Product ()
                {
                    Id= Convert.ToString(ObjectId.GenerateNewId()),
                    Name="Test2",
                    Price=2000,
                    Category="testing2",
                    Description="test description",
                    Summary="123",
                    ImageFile="https://cdn1.ozone.ru/s3/multimedia-q/wc1200/6243095930.jpg"
                },
                new Product ()
                {
                    Id= Convert.ToString(ObjectId.GenerateNewId()),
                    Name="Test3",
                    Price=2000,
                    Category="testing3",
                    Description="test description",
                    Summary="123",
                    ImageFile="https://cdn1.ozone.ru/s3/multimedia-j/wc1200/6024838903.jpg"
                },
                new Product ()
                {
                    Id= Convert.ToString(ObjectId.GenerateNewId()),
                    Name="Test4",
                    Price=2000,
                    Category="testing4",
                    Description="test description",
                    Summary="123",
                    ImageFile="https://cdn1.ozone.ru/s3/multimedia-o/wc1200/6228581160.jpg"
                }
            };
            
        }
    }
}
