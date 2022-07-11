using Microsoft.Extensions.Logging;
using OrderingDomain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingInfrastructure.Persistance
{
    public class OrderContextSeed
    {
        public static async Task SeedAsync(OrderContext orderContext, ILogger<OrderContextSeed> logger)
        {
            if (!orderContext.Orders.Any())
            {
                if (!orderContext.Orders.Any())
                {
                    orderContext.Orders.AddRange(GetPreconfiguredOrders());
                    await orderContext.SaveChangesAsync();
                    logger.LogInformation("Seed database associated with context {DbContextName}", typeof(OrderContext).Name);
                }
            }
        }

        private static IEnumerable<Order> GetPreconfiguredOrders()
        {
            return new List<Order>
            {
                new Order() {UserName = "Admin", FirstName = "Admin", LastName = "Admin", EmailAddress = "", AddressLine = "Bahcelievler", Country = "Russia", TotalPrice = 500,CVV="",ZipCode="",CardName="",CardNumber="",Expiration="",PaymentMethod=1,State="",LastModifiedBy="",LastModifiedDate=DateTime.Now }
            };
        }
    }
}
