using AutoMapper;
using OrderingApplication.Features.Orders.Commands.CheckoutFolder;
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
        }
    }
}
