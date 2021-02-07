import CitiesRepositoryMock from '@modules/cities/repositories/mocks/CitiesRepositoryMock';
import CreateCitiesService from '@modules/cities/services/CreateCitiesService';
import TechnologiesRepositoryMock from '@modules/technologies/repositories/mocks/TechnologiesRepositoryMock';
import CreateTechnologiesService from '@modules/technologies/services/CreateTechnologiesService';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import CandidatesRepositoryMock from '../repositories/mocks/CandidatesRepositoryMock';
import CandidatesTechnologiesRepositoryMock from '../repositories/mocks/CandidatesTechnologiesRepositoryMock';
import CreateOrUpdateCandidatesService from './CreateOrUpdateCandidatesService';
import SaveCandidatesService from './SaveCandidatesService';
import UpdateCandidatesService from './UpdateCandidatesService';
import UpdateCandidatesTechnologiesService from './UpdateCandidatesTechnologiesService';

let citiesRepositoryMock: CitiesRepositoryMock;
let technologiesRepositoryMock: TechnologiesRepositoryMock;
let candidatesRepositoryMock: CandidatesRepositoryMock;
let candidatesTechnologiesRepositoryMock: CandidatesTechnologiesRepositoryMock;

let createTechnologiesService: CreateTechnologiesService;
let updateCandidatesService: UpdateCandidatesService;
let createOrUpdateCandidatesService: CreateOrUpdateCandidatesService;
let createCitiesService: CreateCitiesService;
let updateCandidatesTechnologiesService: UpdateCandidatesTechnologiesService;

let saveCandidatesService: SaveCandidatesService;

describe('SaveCandidatesService', () => {
  beforeEach(() => {
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

  it('should execute all methods', async () => {
    const city = await citiesRepositoryMock.create('Rio de Janeiro', 'RJ');

    const candidate = await candidatesRepositoryMock.create({
      city_id: city.id,
      recruiting_api_id: 10,
      experience: '4-5 years',
    });

    candidate.city = city;

    const tech = await technologiesRepositoryMock.create({
      name: 'Python',
      is_main_tech: true,
    });

    const candidateTech = await candidatesTechnologiesRepositoryMock.create(
      tech.id,
      candidate.id,
      10,
      true,
    );

    candidateTech.technology = tech;
    candidate.technologies = [candidateTech];

    const recruitingApiCandidates: RecruitingApiCandidateDTO[] = [
      {
        city: 'Rio de Janeiro - RJ',
        experience: '4-5 years',
        id: 10,
        technologies: [{ name: 'Python', is_main_tech: false }],
      },
    ];

    const executeCreateTechnologiesService = jest.spyOn(
      createTechnologiesService,
      'execute',
    );
    const executeCreateCitiesService = jest.spyOn(
      createCitiesService,
      'execute',
    );
    const getCitiesRepositoryMock = jest.spyOn(
      citiesRepositoryMock,
      'getCitiesByNameAndStateInitials',
    );
    const executeCreateOrUpdateCandidatesService = jest.spyOn(
      createOrUpdateCandidatesService,
      'execute',
    );
    const executeUpdateCandidatesTechnologiesService = jest.spyOn(
      updateCandidatesTechnologiesService,
      'execute',
    );

    await saveCandidatesService.execute(recruitingApiCandidates);

    expect(executeCreateTechnologiesService).toHaveBeenCalled();
    expect(executeCreateCitiesService).toHaveBeenCalled();
    expect(getCitiesRepositoryMock).toHaveBeenCalled();
    expect(executeCreateOrUpdateCandidatesService).toHaveBeenCalled();
    expect(executeUpdateCandidatesTechnologiesService).toHaveBeenCalled();
  });

  it('should create, and not update candidates data when theres no candidate in the database', async () => {
    await citiesRepositoryMock.create('Rio de Janeiro', 'RJ');

    await technologiesRepositoryMock.create({
      name: 'Python',
      is_main_tech: true,
    });

    const recruitingApiCandidates: RecruitingApiCandidateDTO[] = [
      {
        city: 'Rio de Janeiro - RJ',
        experience: '4-5 years',
        id: 10,
        technologies: [{ name: 'Python', is_main_tech: false }],
      },
    ];

    const executeCreateTechnologiesService = jest.spyOn(
      createTechnologiesService,
      'execute',
    );
    const executeCreateCitiesService = jest.spyOn(
      createCitiesService,
      'execute',
    );
    const getCitiesRepositoryMock = jest.spyOn(
      citiesRepositoryMock,
      'getCitiesByNameAndStateInitials',
    );
    const executeCreateOrUpdateCandidatesService = jest.spyOn(
      createOrUpdateCandidatesService,
      'execute',
    );
    const executeUpdateCandidatesService = jest.spyOn(
      updateCandidatesService,
      'execute',
    );
    await saveCandidatesService.execute(recruitingApiCandidates);

    // checks
    expect(executeCreateTechnologiesService).toHaveBeenCalled();
    expect(executeCreateCitiesService).toHaveBeenCalled();
    expect(getCitiesRepositoryMock).toHaveBeenCalled();
    expect(executeCreateOrUpdateCandidatesService).toHaveBeenCalled();

    expect(executeUpdateCandidatesService).not.toHaveBeenCalled();
  });

  it('should create, and not update candidates data when theres no candidate in the database', async () => {
    await citiesRepositoryMock.create('Rio de Janeiro', 'RJ');

    await technologiesRepositoryMock.create({
      name: 'Python',
      is_main_tech: true,
    });

    const recruitingApiCandidates: RecruitingApiCandidateDTO[] = [
      {
        city: 'Rio de Janeiro - RJ',
        experience: '4-5 years',
        id: 10,
        technologies: [{ name: 'Python', is_main_tech: false }],
      },
    ];

    const executeCreateTechnologiesService = jest.spyOn(
      createTechnologiesService,
      'execute',
    );
    const executeCreateCitiesService = jest.spyOn(
      createCitiesService,
      'execute',
    );
    const getCitiesRepositoryMock = jest.spyOn(
      citiesRepositoryMock,
      'getCitiesByNameAndStateInitials',
    );
    const executeCreateOrUpdateCandidatesService = jest.spyOn(
      createOrUpdateCandidatesService,
      'execute',
    );
    const executeUpdateCandidatesService = jest.spyOn(
      updateCandidatesService,
      'execute',
    );
    await saveCandidatesService.execute(recruitingApiCandidates);

    // checks
    expect(executeCreateTechnologiesService).toHaveBeenCalled();
    expect(executeCreateCitiesService).toHaveBeenCalled();
    expect(getCitiesRepositoryMock).toHaveBeenCalled();
    expect(executeCreateOrUpdateCandidatesService).toHaveBeenCalled();

    expect(executeUpdateCandidatesService).not.toHaveBeenCalled();
  });
});
