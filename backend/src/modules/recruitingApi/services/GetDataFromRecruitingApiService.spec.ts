import GetDataFromRecruitingApiService from './GetDataFromRecruitingApiService';

let getCandidatesFromApiService: GetDataFromRecruitingApiService;

describe('GetDataFromRecruitingApiService', () => {
  beforeEach(() => {
    getCandidatesFromApiService = new GetDataFromRecruitingApiService();
  });

  it('should be able to get all candidates and jobs', async () => {
    const data = await getCandidatesFromApiService.execute();

    expect(data).not.toBeNull();
    expect(data?.candidates?.length).toBeGreaterThan(0);
    expect(data?.jobs?.length).toBeGreaterThan(0);
  });
});
