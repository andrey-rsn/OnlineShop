using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using OrderingApplication.Contracts.Persistance;
using OrderingApplication.Exceptions;
using OrderingDomain.Entities;

namespace OrderingApplication.Features.Orders.Commands.DeleteOrder
{
    public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<DeleteOrderCommandHandler> _logger;

        public DeleteOrderCommandHandler(IOrderRepository orderRepository, IMapper mapper, ILogger<DeleteOrderCommandHandler> logger)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<Unit> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepository.GetByIdAsync(request.Id);

            if(order == null)
            {
                throw new NotFoundException(nameof(Order), request.Id);
            }

            try
            {
                await _orderRepository.DeleteAsync(order);
                _logger.LogInformation($"Order {order.Id} successfully deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occured while deleting order {order.Id} : {ex.Message}");
            }

            return Unit.Value;

        }
    }
}
