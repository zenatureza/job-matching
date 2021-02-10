import 'reflect-metadata';

import axios from 'axios';
import GetDataFromRecruitingApiService from './GetDataFromRecruitingApiService';
import * as apiData from '@tests/fixtures/candidates.json';
import RecruitingApiHttpClient from '@shared/infra/http/RecruitingApiHttpClient';

let recruitingApi: RecruitingApiHttpClient;
let getCandidatesFromApiService: GetDataFromRecruitingApiService;

jest.mock('axios');

describe('GetDataFromRecruitingApiService', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should be able to get all candidates and jobs', async () => {
    mockedAxios.get.mockResolvedValue({ data: apiData });

    recruitingApi = new RecruitingApiHttpClient(mockedAxios);
    getCandidatesFromApiService = new GetDataFromRecruitingApiService(
      recruitingApi,
    );

    const data = await getCandidatesFromApiService.execute();

    expect(data).not.toBeNull();
    expect(data?.candidates?.length).toBeGreaterThan(0);
    expect(data?.jobs?.length).toBeGreaterThan(0);
  });

  it('should log error when couldnt get data', async () => {
    mockedAxios.get.mockResolvedValue({ data: null });

    recruitingApi = new RecruitingApiHttpClient(mockedAxios);
    getCandidatesFromApiService = new GetDataFromRecruitingApiService(
      recruitingApi,
    );

    const response = await getCandidatesFromApiService.execute();

    expect(response).toBeUndefined();
    expect(mockedAxios).toBeCalled;
  });
});
