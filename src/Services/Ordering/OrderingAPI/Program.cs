using OrderingAPI.Extensions;
using OrderingApplication;
using OrderingInfrastructure;
using OrderingInfrastructure.Persistance;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddinfrastructureServices(configuration);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();
app.MigrateDatabase<OrderContext>((context, service) =>
{
    var logger = app.Services.GetService<ILogger<OrderContextSeed>>();
    OrderContextSeed
                .SeedAsync(context, logger)
                .Wait();
});
app.Run();
