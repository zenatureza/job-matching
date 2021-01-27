using System.Reflection;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace ApplicationCore.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection AddApplicationCoreConfig(this IServiceCollection services)
        {
            services
                .AddMediatR(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
