using Microsoft.EntityFrameworkCore;
using OrderingApplication.Contracts.Persistance;
using OrderingDomain.Entities;
using OrderingInfrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingInfrastructure.Repositories
{
    public class OrderRepository : RepositoryBase<Order>, IOrderRepository
    {
        public OrderRepository(OrderContext orderContext) : base(orderContext)
        {
        }
        public async Task<IEnumerable<Order>> GetOrdersByUserName(string userName)
        {
            var orderList = await _dbContext.Orders.Where(p => p.UserName == userName).ToListAsync();

            return orderList;
        }
    }
}
