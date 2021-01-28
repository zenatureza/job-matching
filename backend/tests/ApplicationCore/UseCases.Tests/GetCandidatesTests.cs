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
    public class GetCandidatesTests
    {
        [Fact]
        public async void ShouldReturnAllCandidates()
        {
            // Arrange
            var handlerMock = new Mock<HttpMessageHandler>();

            var content = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "..\\..\\..\\candidates.json"));
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

            var requestHandler = new GetCandidatesQueryHandler(httpClient, mapper);

            // In this case we'll not provide any filtering parameter
            var request = new GetCandidatesQuery();

            // Act
            BestCandidatesVm retrievedCandidates = await requestHandler
                .Handle(request, new CancellationToken());

            // Assert
            retrievedCandidates
                .Should()
                .NotBeNull();

            retrievedCandidates
                .OtherCandidates
                .Should()
                .NotBeNullOrEmpty();

            retrievedCandidates
                .BestMatches
                .Should()
                .NotBeNullOrEmpty()
                .And.HaveCount(5);
        }

        // It should have 7 candidates from this city, with 5 of them as part of 'BestMatches' property
        [Theory]
        [InlineData("Rio de Janeiro - RJ")]
        public async void ShouldReturnFirstCandidatesOfSameCity(string city)
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

            var requestHandler = new GetCandidatesQueryHandler(httpClient, mapper);

            // In this case we'll only provide city parameter to check return order
            var request = new GetCandidatesQuery()
            {
                City = city
            };

            // Act
            BestCandidatesVm retrievedCandidates = await requestHandler
                .Handle(request, new CancellationToken());

            // Assert
            retrievedCandidates
                .Should()
                .NotBeNull();

            retrievedCandidates
                .BestMatches
                .Should()
                .NotBeNullOrEmpty()
                .And.HaveCount(5);

            retrievedCandidates
                .OtherCandidates
                .Should()
                .NotBeNullOrEmpty()
                .And.Contain(x => x.City == city)
                .And.Contain(x => x.City != city);
        }
    }
}
