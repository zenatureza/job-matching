using System.Collections.Generic;

namespace ApplicationCore.Domain
{
    public class Candidate
    {
        public Candidate(string city, string experience, IReadOnlyList<CandidateTechnology> candidateTechnologies)
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
