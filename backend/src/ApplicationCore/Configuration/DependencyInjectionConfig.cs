using System.Reflection;
using ApplicationCore.Application.Behaviors;
using ApplicationCore.Application.Mappings;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation;

namespace ApplicationCore.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection AddApplicationCoreConfig(this IServiceCollection services)
        {
            services
                .AddMediatR(Assembly.GetExecutingAssembly());

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            services
                .AddSingleton(mapper);

            services
                .AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            services
                .AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
