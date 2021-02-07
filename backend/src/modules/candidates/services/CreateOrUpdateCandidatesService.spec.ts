import CitiesRepositoryMock from '@modules/cities/repositories/mocks/CitiesRepositoryMock';
import Candidate from '../infra/typeorm/entities/Candidate.entity';
import CandidatesRepositoryMock from '../repositories/mocks/CandidatesRepositoryMock';
import CreateOrUpdateCandidatesService from './CreateOrUpdateCandidatesService';
import UpdateCandidatesService from './UpdateCandidatesService';

let candidatesRepositoryMock: CandidatesRepositoryMock;
let citiesRepositoryMock: CitiesRepositoryMock;
let createCandidatesService: CreateOrUpdateCandidatesService;
let updateCandidatesService: UpdateCandidatesService;

describe('CreateOrUpdateCandidatesService', () => {
  beforeEach(() => {
    citiesRepositoryMock = new CitiesRepositoryMock();
    candidatesRepositoryMock = new CandidatesRepositoryMock();

    updateCandidatesService = new UpdateCandidatesService(
      candidatesRepositoryMock,
    );

    createCandidatesService = new CreateOrUpdateCandidatesService(
      candidatesRepositoryMock,
      updateCandidatesService,
    );
  });

  it('should create unknown candidates', async () => {
    const city = await citiesRepositoryMock.create('Recife', 'PE');

    const createdCandidate = await createCandidatesService.execute(
      [
        {
          experience: '4-5 years',
          id: 111,
          technologies: [],
          city: 'Recife - PE',
        },
      ],
      [city],
    );

    if (createdCandidate) {
      expect(createdCandidate[0]).toHaveProperty('id');
      expect(createdCandidate[0].getExperience()).toBe('4-5 years');
    }
  });

  it('should not create already existing candidates', async () => {
    const existingCandidate = await candidatesRepositoryMock.create({
      city_id: '651651',
      recruiting_api_id: 1,
      experience: '4-5 years',
    });

    const city = await citiesRepositoryMock.create('Recife', 'PE');

    existingCandidate.city = city;

    const createdCandidate = await createCandidatesService.execute(
      [
        {
          city: 'Recife - PE',
          experience: '4-5 years',
          id: 1,
          technologies: [],
        },
      ],
      [city],
    );

    const result: Candidate[] = [];

    expect(createdCandidate).toStrictEqual(result);
  });

  it('should not create candidate when city is invalid', async () => {
    const existingCandidate = await candidatesRepositoryMock.create({
      city_id: '651651',
      recruiting_api_id: 1,
      experience: '4-5 years',
    });

    const city = await citiesRepositoryMock.create('Recife', 'PE');

    existingCandidate.city = city;

    const createdCandidate = await createCandidatesService.execute(
      [
        {
          city: 'Recife - PE',
          experience: '4-5 years',
          id: 1,
          technologies: [],
        },
      ],
      [city],
    );

    const result: Candidate[] = [];

    expect(createdCandidate).toStrictEqual(result);
  });

  it('should not set candidate city_id when city was not found', async () => {
    await candidatesRepositoryMock.create({
      city_id: '651651',
      recruiting_api_id: 1,
      experience: '4-5 years',
    });

    const city = await citiesRepositoryMock.create('Recife', 'PE');

    const createdCandidates = await createCandidatesService.execute(
      [
        {
          city: 'Porto Alegre - RS',
          experience: '12+ years',
          id: 20,
          technologies: [],
        },
      ],
      [city],
    );

    if (createdCandidates) {
      expect(createdCandidates[0].city_id).toBeUndefined();
    }
  });
});
