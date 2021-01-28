using System.Collections.Generic;

namespace ApplicationCore.Domain
{
    // TODO: City and experience should be enums
    public class Candidate
    {
        public Candidate(
            string city,
            string experience,
            IReadOnlyList<CandidateTechnology> candidateTechnologies)
        {
            City = city;
            Experience = experience;
            Technologies = candidateTechnologies;
        }

        public string City { get; set; }

        public string Experience { get; set; }

        public IReadOnlyList<CandidateTechnology> Technologies { get; set; }
    }
}
