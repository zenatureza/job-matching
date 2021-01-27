using System;
using System.Collections.Generic;
using Xunit;

namespace ApplicationCore.Domain.Tests
{
    public class CandidateTest
    {
        [Fact(DisplayName = "")]
        public void CreateCandidate()
        {
            string city = "";
            string experience = "";
            IReadOnlyList<CandidateTechnology> candidateTechnologies = new List<CandidateTechnology>()
            {
                new CandidateTechnology()
                {
                    Name = "C#",
                    IsMainTech = true
                },
            };

            var candidate = new Candidate(city, experience, candidateTechnologies);

            Assert.Equal(city, candidate.City);
            Assert.Equal(experience, candidate.Experience);
            Assert.Equal(candidateTechnologies, candidate.Technologies);
        }
    }
}
