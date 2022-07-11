using OrderingDomain.Entities;

namespace OrderingApplication.Contracts.Persistance
{
    public interface IOrderRepository:IAsyncRepository<Order>
    {
        Task<IEnumerable<Order>> GetOrdersByUserName(string userName);
    }
}
