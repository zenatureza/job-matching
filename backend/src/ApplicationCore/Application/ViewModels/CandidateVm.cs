using System.Collections.Generic;
using ApplicationCore.Domain;
using ApplicationCore.Domain.Interfaces;

namespace ApplicationCore
{
    public class CandidateVm :
        IMapFrom<Candidate>
    {
        public string City { get; set; }

        public string Experience { get; set; }

        public IReadOnlyList<CandidateTechnology> Technologies { get; set; }
    }
}
