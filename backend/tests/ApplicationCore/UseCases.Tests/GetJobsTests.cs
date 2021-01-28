using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using ApplicationCore;
using FluentAssertions;
using Moq;
using Moq.Protected;
using Xunit;

namespace UseCases.Tests
{
    public class GetJobsTests : IntegrationTestSetup
    {
        [Fact]
        public async void ShouldReturnAllAvailableJobs()
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
            var requestHandler = new GetJobsQueryHandler(httpClient);

            var request = new GetJobsQuery();

            // Act
            IEnumerable<Job> retrievedJobs = await requestHandler
                .Handle(request, new CancellationToken());

            // Assert
            retrievedJobs
                .Should()
                .NotBeNullOrEmpty();
        }
    }
}
