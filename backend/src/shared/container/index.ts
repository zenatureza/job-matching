import CandidatesRepository from '@modules/candidates/infra/typeorm/repositories/CandidatesRepository';
import CandidatesTechnologiesRepository from '@modules/candidates/infra/typeorm/repositories/CandidatesTechnologiesRepository';
import ICandidatesRepository from '@modules/candidates/repositories/ICandidatesRepository';
import ICandidatesTechnologiesRepository from '@modules/candidates/repositories/ICandidatesTechnologiesRepository';
import CalculateBestCandidatesService from '@modules/candidates/services/CalculateBestCandidatesService';
import UpdateCandidatesService from '@modules/candidates/services/UpdateCandidatesService';
import CitiesRepository from '@modules/cities/infra/typeorm/repositories/CitiesRepository';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import GetDataFromRecruitingApiService from '@modules/recruitingApi/services/GetDataFromRecruitingApiService';
import TechnologiesRepository from '@modules/technologies/infra/typeorm/repositories/TechnologiesRepository';
import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import CreateTechnologiesService from '@modules/technologies/services/CreateTechnologiesService';
import RecruitingApi from '@shared/infra/http/RecruitingApi';
import axios, { AxiosInstance, AxiosStatic } from 'axios';
import { container } from 'tsyringe';

container.registerInstance<AxiosInstance>(
  'axios',
  axios.create({
    baseURL: 'https://geekhunter-recruiting.s3.amazonaws.com',
  }),
);

container.registerSingleton<RecruitingApi>('RecruitingApi', RecruitingApi);

container.registerSingleton<ICandidatesRepository>(
  'CandidatesRepository',
  CandidatesRepository,
);

container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository,
);

container.registerSingleton<ITechnologiesRepository>(
  'TechnologiesRepository',
  TechnologiesRepository,
);

container.registerSingleton<ICandidatesTechnologiesRepository>(
  'CandidatesTechnologiesRepository',
  CandidatesTechnologiesRepository,
);

container.registerSingleton<GetDataFromRecruitingApiService>(
  'GetDataFromRecruitingApiService',
  GetDataFromRecruitingApiService,
);

container.registerSingleton<UpdateCandidatesService>(
  'UpdateCandidatesService',
  UpdateCandidatesService,
);

container.registerSingleton<CalculateBestCandidatesService>(
  'CalculateBestCandidatesService',
  CalculateBestCandidatesService,
);

container.registerSingleton<CreateTechnologiesService>(
  'CreateTechnologiesService',
  CreateTechnologiesService,
);

// container.registerSingleton<typeof axios>('axios', typeof axios);
