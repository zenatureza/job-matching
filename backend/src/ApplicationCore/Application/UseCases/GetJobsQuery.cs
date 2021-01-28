using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using ApplicationCore.Application.Utils;
using MediatR;
using Newtonsoft.Json.Linq;

namespace ApplicationCore
{
    public class GetJobsQuery :
        IRequest<IEnumerable<Job>>
    {
        // TODO: Adicionar campos da requisição
    }

    public class GetJobsQueryHandler :
        IRequestHandler<GetJobsQuery, IEnumerable<Job>>
    {
        private readonly HttpClient _httpClient;

        public GetJobsQueryHandler(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Job>> Handle(
            GetJobsQuery request,
            CancellationToken cancellationToken)
        {
            // TODO: Remover magic string
            var response = await _httpClient
                .GetAsync("https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json",
                          cancellationToken);

            return await HttpResponseConverter<Job>
                .GetArrayFromJsonByKey(response,
                                       "jobs",
                                       cancellationToken);
        }
    }
}
