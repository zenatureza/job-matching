using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ApplicationCore.Application.Contracts;
using ApplicationCore.Application.Utils;
using ApplicationCore.Domain;
using AutoMapper;
using MediatR;

namespace ApplicationCore
{
    public class GetTechnologiesByFilterQuery
        : IRequest<IEnumerable<string>>
    {
        public string Filter { get; set; }
    }
}

namespace ApplicationCore
{
    public class GetTechnologiesByFilterQueryHandler :
        IRequestHandler<GetTechnologiesByFilterQuery, IEnumerable<string>>
    {
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;

        public GetTechnologiesByFilterQueryHandler(
            HttpClient httpClient,
            IMapper mapper)
        {
            _httpClient = httpClient;
            _mapper = mapper;
        }

        public async Task<IEnumerable<string>> Handle(
            GetTechnologiesByFilterQuery request,
            CancellationToken cancellationToken)
        {
            var response = await _httpClient
                .GetAsync("https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json",
                          cancellationToken);

            var candidates = await HttpResponseConverter<Candidate>
                .GetArrayFromJsonByKey(response,
                                       "candidates",
                                       cancellationToken);

            // TODO: Implement using database repository?
            List<string> result = new List<string>();
            foreach (var candidate in candidates)
            {
                var candidateTechnologies = candidate.Technologies;

                var containsFilter = candidateTechnologies
                    .Where(tech => tech.Name.ToLower().Contains(request.Filter.ToLower()));

                if (containsFilter.Any())
                {
                    var validNames = containsFilter
                        .Where(tech => !result.Any(currentName => currentName == tech.Name))
                        .Select(x => x.Name)
                        .ToList();

                    result.AddRange(validNames);
                }
            }

            return result.Count >= Constants.MAX_AUTOCOMPLETE_RESULTS ? result
                .GetRange(0, Constants.MAX_AUTOCOMPLETE_RESULTS) :
                result;
        }
    }
}
