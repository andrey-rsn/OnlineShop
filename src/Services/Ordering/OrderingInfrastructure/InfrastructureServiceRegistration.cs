using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OrderingApplication.Contracts.Infrastructure;
using OrderingApplication.Contracts.Persistance;
using OrderingApplication.Models;
using OrderingInfrastructure.Persistance;
using OrderingInfrastructure.Repositories;
using OrderingInfrastructure.Services.Mail;

namespace OrderingInfrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddinfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<OrderContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("OrderingConnectionString")));

            services.AddScoped(typeof(IAsyncRepository<>), typeof(RepositoryBase<>));
            services.AddScoped<IOrderRepository, OrderRepository>();

            services.Configure<EmailSettings>(c => configuration.GetSection("EmailSettings"));
            services.AddTransient<IEmailService, EmailService>();

            return services;
        }
    }
}
