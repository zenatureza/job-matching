using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json.Linq;

namespace ApplicationCore
{
    public class GetJobsQuery : IRequest<IEnumerable<Job>>
    {
        // TODO: Adicionar campos da requisição
    }

    public class GetJobsQueryHandler : IRequestHandler<GetJobsQuery, IEnumerable<Job>>
    {
        private readonly HttpClient _httpClient;

        public GetJobsQueryHandler(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Job>> Handle(GetJobsQuery request, CancellationToken cancellationToken)
        {
            var response = await _httpClient
                .GetAsync("https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json");

            var body = await response.Content
                .ReadAsStringAsync(cancellationToken);

            JObject jobsParsed = JObject.Parse(body);
            IList<JToken> results = jobsParsed["jobs"]
                .Children()
                .ToList();

            IList<Job> jobs = new List<Job>();
            foreach (JToken result in results)
            {
                Job job = result.ToObject<Job>();
                jobs.Add(job);
            }

            return jobs;
        }
    }
}
