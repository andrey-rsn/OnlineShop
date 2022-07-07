using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using OrderingApplication.Contracts.Persistance;
using OrderingDomain.Entities;

namespace OrderingApplication.Features.Orders.Commands.UpdateOrder
{
    public class UpdateOrderCommandHandler : IRequestHandler<UpdateOrderCommand>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UpdateOrderCommandHandler> _logger;

        public UpdateOrderCommandHandler(IOrderRepository orderRepository, IMapper mapper, ILogger<UpdateOrderCommandHandler> logger)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<Unit> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepository.GetByIdAsync(request.Id);

            if (order == null)
            {
                _logger.LogError("Order not exist in database");
                return Unit.Value;
            }

            _mapper.Map(request, order, typeof(UpdateOrderCommand), typeof(Order));

            try
            {
                await _orderRepository.UpdateAsync(order);

                _logger.LogInformation($"Order {order.Id} successfully updated");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occured while updating order {order.Id} : {ex.Message}");
            }

            return Unit.Value;
        }
    }
}
