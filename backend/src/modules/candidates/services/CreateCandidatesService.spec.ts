import CitiesRepositoryMock from '@modules/cities/repositories/mocks/CitiesRepositoryMock';
import Candidate from '../infra/typeorm/entities/Candidate.entity';
import CandidatesRepositoryMock from '../repositories/mocks/CandidatesRepositoryMock';
import CreateCandidatesService from './CreateCandidatesService';

let candidatesRepositoryMock: CandidatesRepositoryMock;
let citiesRepositoryMock: CitiesRepositoryMock;
let createCandidatesService: CreateCandidatesService;

describe('CreateCandidatesService', () => {
  beforeEach(() => {
    citiesRepositoryMock = new CitiesRepositoryMock();
    candidatesRepositoryMock = new CandidatesRepositoryMock();

    createCandidatesService = new CreateCandidatesService(
      candidatesRepositoryMock,
      citiesRepositoryMock,
    );
  });

  it('should create unknown candidates', async () => {
    const createdCandidate = await createCandidatesService.execute([
      {
        experience: '4-5 years',
        id: 111,
        technologies: [],
        city: 'Recife - PE',
      },
    ]);

    if (createdCandidate) {
      expect(createdCandidate[0]).toHaveProperty('id');
      expect(createdCandidate[0].getExperience()).toBe('4-5 years');
    }
  });

  it('should not create already existing candidates', async () => {
    await candidatesRepositoryMock.create({
      city_id: '651651',
      recruiting_api_id: 1,
      experience: '4-5 years',
    });

    const createdCandidate = await createCandidatesService.execute([
      {
        city: 'Recife - PE',
        experience: '4-5 years',
        id: 1,
        technologies: [],
      },
    ]);

    const result: Candidate[] = [];

    expect(createdCandidate).toStrictEqual(result);
  });

  it('should not create candidate when city is invalid', async () => {
    // await candidatesRepositoryMock.create({
    //   city_id: '651651',
    //   recruiting_api_id: 1,
    //   experience: '4-5 years',
    // });

    const createdCandidate = await createCandidatesService.execute([
      {
        // city: 'Recife - PE',
        city: '',
        experience: '4-5 years',
        id: 1,
        technologies: [],
      },
    ]);

    const result: Candidate[] = [];

    expect(createdCandidate).toStrictEqual(result);
  });
});
