using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using ApplicationCore.Application.Utils;
using ApplicationCore.Application.ViewModels;
using ApplicationCore.Domain;
using AutoMapper;
using MediatR;

namespace ApplicationCore
{
    public class GetCandidatesQuery :
        IRequest<BestCandidatesVm>
    {
        public string City { get; set; }

        public string Experience { get; set; }

        public string[] MainTechnologies { get; set; }

        public string[] OtherTechnologies { get; set; }
        //public IReadOnlyList<CandidateTechnology> Technologies { get; set; }
    }

    public class GetCandidatesQueryHandler :
        IRequestHandler<GetCandidatesQuery, BestCandidatesVm>
    {
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;

        public GetCandidatesQueryHandler(
            HttpClient httpClient,
            IMapper mapper)
        {
            _httpClient = httpClient;
            _mapper = mapper;
        }

        public async Task<BestCandidatesVm> Handle(
            GetCandidatesQuery request,
            CancellationToken cancellationToken)
        {
            // TODO: Remove magic string
            var response = await _httpClient
                .GetAsync("https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json",
                          cancellationToken);

            var candidates = await HttpResponseConverter<Candidate>
                .GetArrayFromJsonByKey(response,
                                       "candidates",
                                       cancellationToken);

            // TODO: Should apply jobMatchingAlgorithm before returning the candidates
            var candidatesWithCity = candidates
                .Where(x => x.City == request.City)
                .ToList();

            var candidatesNotInCity = candidates
                .Where(x => x.City != request.City);

            CandidateVm[] bestMatches = _mapper
                .Map<Candidate[], CandidateVm[]>
                (candidatesWithCity.ToArray());

            IEnumerable<CandidateVm> otherCandidates = _mapper
                .Map<IEnumerable<Candidate>, IEnumerable<CandidateVm>>
                (candidatesNotInCity);

            return new BestCandidatesVm(bestMatches,
                                        otherCandidates);
        }
    }
}
