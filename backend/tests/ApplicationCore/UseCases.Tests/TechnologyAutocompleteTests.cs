using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ApplicationCore;
using ApplicationCore.Application.Mappings;
using ApplicationCore.Application.ViewModels;
using ApplicationCore.Domain;
using AutoMapper;
using FluentAssertions;
using Moq;
using Moq.Protected;
using Xunit;

namespace UseCases.Tests
{
    public class TechnologyAutocompleteTests
    {
        [Theory]
        [InlineData("post")]
        [InlineData("Post")]
        [InlineData("POST")]
        [InlineData("posT")]
        [InlineData("pos")]
        public async void ShouldReturnPostgreSQL(string filter)
        {
            // Arrange
            var handlerMock = new Mock<HttpMessageHandler>();

            var content = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(),
                                                        "..\\..\\..\\candidates.json"));
            var response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(@$"{content}")
            };

            handlerMock
               .Protected()
               .Setup<Task<HttpResponseMessage>>(
                  "SendAsync",
                  ItExpr.IsAny<HttpRequestMessage>(),
                  ItExpr.IsAny<CancellationToken>())
               .ReturnsAsync(response);

            var httpClient = new HttpClient(handlerMock.Object);
            var mapperProfile = new MappingProfile();
            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile(mapperProfile)));

            var request = new GetTechnologiesByFilterQuery()
            {
                Filter = filter
            };

            var requestHandler = new GetTechnologiesByFilterQueryHandler(httpClient, mapper);

            // Act
            IEnumerable<string> technologies = await requestHandler
                .Handle(request, new CancellationToken());

            // Assert
            technologies
                .Should()
                .NotBeNullOrEmpty()
                .And.Contain(x => x == "PostgreSQL")
                .And.HaveCount(1);
        }

        [Theory]
        [InlineData("sql")]
        [InlineData("SQL")]
        [InlineData("SqL")]
        [InlineData("Sql")]
        public async void ShouldReturnMaxFiveResults(string filter)
        {
            // Arrange
            var handlerMock = new Mock<HttpMessageHandler>();

            var content = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(),
                                                        "..\\..\\..\\candidates.json"));
            var response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(@$"{content}")
            };

            handlerMock
               .Protected()
               .Setup<Task<HttpResponseMessage>>(
                  "SendAsync",
                  ItExpr.IsAny<HttpRequestMessage>(),
                  ItExpr.IsAny<CancellationToken>())
               .ReturnsAsync(response);

            var httpClient = new HttpClient(handlerMock.Object);
            var mapperProfile = new MappingProfile();
            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile(mapperProfile)));

            var request = new GetTechnologiesByFilterQuery()
            {
                Filter = filter
            };

            var requestHandler = new GetTechnologiesByFilterQueryHandler(httpClient, mapper);

            // Act
            IEnumerable<string> technologies = await requestHandler
                .Handle(request, new CancellationToken());

            // Assert
            technologies
                .Should()
                .NotBeNullOrEmpty()
                .And.Contain(x => x.ToLower().Contains("sql"))
                .And.HaveCountLessOrEqualTo(5);
        }
    }
}
