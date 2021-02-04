import GetDataFromRecruitingApiService from '@modules/recruitingApi/services/GetDataFromRecruitingApiService';
import GetBestCandidatesService from './GetBestCandidatesService';

let getDataFromRecruitingApiService: GetDataFromRecruitingApiService;
let getBestCandidatesService: GetBestCandidatesService;

describe('GetBestCandidatesService', () => {
  beforeEach(() => {
    getDataFromRecruitingApiService = new GetDataFromRecruitingApiService();

    getBestCandidatesService = new GetBestCandidatesService(
      getDataFromRecruitingApiService,
    );
  });

  it('should return at least 5 candidates with 12 years + of experience', async () => {
    const request = {
      city: 'São Paulo - SP',
      experience: '12+ years',
      technologies: [{ name: 'Java', is_main_tech: true }],
    };

    const bestCandidates = await getBestCandidatesService.execute(request);

    expect(bestCandidates).not.toBeNull();
  });
});
