import CitiesRepositoryMock from '@modules/cities/repositories/mocks/CitiesRepositoryMock';
import GetDataFromRecruitingApiService from '@modules/recruitingApi/services/GetDataFromRecruitingApiService';
import RecruitingApi from '@shared/infra/http/RecruitingApi';
import axios from 'axios';
import CalculateBestCandidatesService from './CalculateBestCandidatesService';
import SaveCandidatesService from './SaveCandidatesService';
import * as apiData from '@tests/fixtures/candidates.json';
import GetBestCandidatesService from './GetBestCandidatesService';
import CreateTechnologiesService from '@modules/technologies/services/CreateTechnologiesService';
import TechnologiesRepositoryMock from '@modules/technologies/repositories/mocks/TechnologiesRepositoryMock';
import CandidatesRepositoryMock from '../repositories/mocks/CandidatesRepositoryMock';
import UpdateCandidatesService from './UpdateCandidatesService';
import CreateOrUpdateCandidatesService from './CreateOrUpdateCandidatesService';
import CreateCitiesService from '@modules/cities/services/CreateCitiesService';
import CandidatesTechnologiesRepositoryMock from '../repositories/mocks/CandidatesTechnologiesRepositoryMock';
import UpdateCandidatesTechnologiesService from './UpdateCandidatesTechnologiesService';
import JobMatchingCalculatorHttpClient from '../infra/http/JobMatchingCalculatorHttpClient';
import AppError from '@shared/errors/AppError';

let recruitingApi: RecruitingApi;
let getDataFromRecruitingApiService: GetDataFromRecruitingApiService;
let saveCandidatesService: SaveCandidatesService;
let calculateBestCandidatesService: CalculateBestCandidatesService;
let citiesRepositoryMock: CitiesRepositoryMock;
let technologiesRepositoryMock: TechnologiesRepositoryMock;
let candidatesRepositoryMock: CandidatesRepositoryMock;
let updateCandidatesService: UpdateCandidatesService;
let createOrUpdateCandidatesService: CreateOrUpdateCandidatesService;
let createCitiesService: CreateCitiesService;
let candidatesTechnologiesRepositoryMock: CandidatesTechnologiesRepositoryMock;
let updateCandidatesTechnologiesService: UpdateCandidatesTechnologiesService;
let getBestCandidatesService: GetBestCandidatesService;
let createTechnologiesService: CreateTechnologiesService;
let jobMatchingCalculatorHttpClient: JobMatchingCalculatorHttpClient;

jest.mock('axios');

describe('GetBestCandidatesService', () => {
  const recruitingApiMockedAxios = axios as jest.Mocked<typeof axios>;
  const jobMatchingCalculatorMockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.resetModules();

    citiesRepositoryMock = new CitiesRepositoryMock();
    technologiesRepositoryMock = new TechnologiesRepositoryMock();
    candidatesRepositoryMock = new CandidatesRepositoryMock();

    createTechnologiesService = new CreateTechnologiesService(
      technologiesRepositoryMock,
    );

    updateCandidatesService = new UpdateCandidatesService(
      candidatesRepositoryMock,
    );

    createOrUpdateCandidatesService = new CreateOrUpdateCandidatesService(
      candidatesRepositoryMock,
      updateCandidatesService,
    );

    createCitiesService = new CreateCitiesService(citiesRepositoryMock);

    candidatesTechnologiesRepositoryMock = new CandidatesTechnologiesRepositoryMock();

    updateCandidatesTechnologiesService = new UpdateCandidatesTechnologiesService(
      candidatesTechnologiesRepositoryMock,
      candidatesRepositoryMock,
      technologiesRepositoryMock,
    );

    saveCandidatesService = new SaveCandidatesService(
      citiesRepositoryMock,
      createTechnologiesService,
      createOrUpdateCandidatesService,
      createCitiesService,
      updateCandidatesTechnologiesService,
    );
  });

  it('should call saveCandidatesService when recruitingApiData is valid', async () => {
    const city = await citiesRepositoryMock.create('São Paulo', 'SP');

    recruitingApiMockedAxios.get.mockResolvedValue({ data: apiData });

    recruitingApi = new RecruitingApi(recruitingApiMockedAxios);
    getDataFromRecruitingApiService = new GetDataFromRecruitingApiService(
      recruitingApi,
    );

    jest.resetModules();

    const executeSaveCandidatesService = jest.spyOn(
      saveCandidatesService,
      'execute',
    );

    // jobMatchingCalculatorMockedAxios.get.mockResolvedValue({
    //   data: {
    //     candidates: [
    //       {
    //         candidate_id: '1212',
    //         city_id: city.id,
    //         end_experience_range: 10,
    //         start_experience_range: 20,
    //         state_initials: 'RS',
    //         technologies: [],
    //       },
    //     ],
    //     jobs: [
    //       {
    //         id: '515616',
    //         city: 'São Paulo - SP',
    //         technologies: [],
    //         experience: '4-5 years',
    //       },
    //     ],
    //   },
    // });

    jobMatchingCalculatorHttpClient = new JobMatchingCalculatorHttpClient(
      jobMatchingCalculatorMockedAxios,
    );

    calculateBestCandidatesService = new CalculateBestCandidatesService(
      jobMatchingCalculatorHttpClient,
    );

    getBestCandidatesService = new GetBestCandidatesService(
      getDataFromRecruitingApiService,
      saveCandidatesService,
      calculateBestCandidatesService,
      citiesRepositoryMock,
    );

    await getBestCandidatesService.execute({
      cityId: city.id,
      startExperienceRange: 4,
      endExperienceRange: 5,
      technologiesIds: [],
    });

    expect(executeSaveCandidatesService).toHaveBeenCalled();
  });

  it('should throw an apperror when candidate city is invalid', async () => {
    await citiesRepositoryMock.create('São Paulo', 'SP');

    recruitingApiMockedAxios.get.mockResolvedValue({ data: apiData });

    recruitingApi = new RecruitingApi(recruitingApiMockedAxios);
    getDataFromRecruitingApiService = new GetDataFromRecruitingApiService(
      recruitingApi,
    );

    jobMatchingCalculatorHttpClient = new JobMatchingCalculatorHttpClient(
      jobMatchingCalculatorMockedAxios,
    );

    calculateBestCandidatesService = new CalculateBestCandidatesService(
      jobMatchingCalculatorHttpClient,
    );

    getBestCandidatesService = new GetBestCandidatesService(
      getDataFromRecruitingApiService,
      saveCandidatesService,
      calculateBestCandidatesService,
      citiesRepositoryMock,
    );

    await expect(
      getBestCandidatesService.execute({
        cityId: '',
        startExperienceRange: 4,
        endExperienceRange: 5,
        technologiesIds: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not call saveCandidatesService when recruitingApiData isnt valid', async () => {
    const city = await citiesRepositoryMock.create('São Paulo', 'SP');

    recruitingApiMockedAxios.get.mockResolvedValue({ data: null });

    recruitingApi = new RecruitingApi(recruitingApiMockedAxios);
    getDataFromRecruitingApiService = new GetDataFromRecruitingApiService(
      recruitingApi,
    );

    jest.resetModules();

    const executeSaveCandidatesService = jest.spyOn(
      saveCandidatesService,
      'execute',
    );

    jobMatchingCalculatorHttpClient = new JobMatchingCalculatorHttpClient(
      jobMatchingCalculatorMockedAxios,
    );

    calculateBestCandidatesService = new CalculateBestCandidatesService(
      jobMatchingCalculatorHttpClient,
    );

    getBestCandidatesService = new GetBestCandidatesService(
      getDataFromRecruitingApiService,
      saveCandidatesService,
      calculateBestCandidatesService,
      citiesRepositoryMock,
    );

    await getBestCandidatesService.execute({
      cityId: city.id,
      startExperienceRange: 4,
      endExperienceRange: 5,
      technologiesIds: [],
    });

    expect(executeSaveCandidatesService).not.toHaveBeenCalled();
  });
});
