using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Cache.CacheManager;

var builder = WebApplication.CreateBuilder(args);
builder.Host.ConfigureAppConfiguration((hostingContext, config) =>
{
    config.AddJsonFile($"ocelot.{hostingContext.HostingEnvironment.EnvironmentName}.json",true,true);
});
builder.Services.AddOcelot().AddCacheManager(options=>options.WithDictionaryHandle());

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

await app.UseOcelot();

app.Run();
