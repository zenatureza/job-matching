using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using System.IO;
using RestApi;

namespace UseCases.Tests
{
    public class IntegrationTestSetup
    {
        private static IServiceScopeFactory _scopeFactory;
        private static IConfigurationRoot _configuration;

        public IntegrationTestSetup()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.Development.json", true, true)
                .AddEnvironmentVariables();

            _configuration = builder
                .Build();

            var startup = new Startup(_configuration);

            var services = new ServiceCollection();

            services
                .AddSingleton(Mock.Of<IHostEnvironment>(w =>
                w.EnvironmentName == "Development" &&
                w.ApplicationName == "RestApi"));

            startup
                .ConfigureServices(services);

            _scopeFactory = services
                .BuildServiceProvider()
                .GetService<IServiceScopeFactory>();
        }

        public static async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
        {
            using var scope = _scopeFactory
                .CreateScope();

            var mediator = scope.ServiceProvider
                .GetService<IMediator>();

            return await mediator
                .Send(request);
        }
    }
}
