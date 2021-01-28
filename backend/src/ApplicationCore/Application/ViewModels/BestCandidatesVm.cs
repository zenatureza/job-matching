using System.Collections.Generic;
using ApplicationCore.Domain;

namespace ApplicationCore.Application.ViewModels
{
    public class BestCandidatesVm
    {
        public CandidateVm[] BestMatches { get; set; }

        public List<CandidateVm> OtherCandidates { get; set; }

        public BestCandidatesVm()
        {
            BestMatches = new CandidateVm[5];
            OtherCandidates = new List<CandidateVm>();
        }

        public BestCandidatesVm(
            CandidateVm[] bestMatches,
            IEnumerable<CandidateVm> otherCandidates)
        {
            BestMatches = new CandidateVm[5];
            OtherCandidates = new List<CandidateVm>();

            for (int i = 0; i < bestMatches.Length; i++)
            {
                if (i < 5)
                    BestMatches[i] = bestMatches[i];
                else
                    OtherCandidates.Add(bestMatches[i]);
            }

            OtherCandidates.AddRange(otherCandidates);
        }
    }
}
