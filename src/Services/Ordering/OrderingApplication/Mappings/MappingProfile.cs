using AutoMapper;
using OrderingApplication.Features.Orders.Commands.CheckoutOrder;
using OrderingApplication.Features.Orders.Commands.UpdateOrder;
using OrderingApplication.Features.Orders.Queries.GetOrdersList;
using OrderingDomain.Entities;

namespace OrderingApplication.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Order, OrdersVm>().ReverseMap();
            CreateMap<Order, CheckoutOrderCommand>().ReverseMap();
            CreateMap<Order, UpdateOrderCommand>().ReverseMap();
        }
    }
}
