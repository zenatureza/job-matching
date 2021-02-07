import CitiesRepositoryMock from '@modules/cities/repositories/mocks/CitiesRepositoryMock';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import Candidate from '../infra/typeorm/entities/Candidate.entity';
import CandidatesRepositoryMock from '../repositories/mocks/CandidatesRepositoryMock';
import UpdateCandidatesService from './UpdateCandidatesService';

let candidatesRepositoryMock: CandidatesRepositoryMock;
let citiesRepositoryMock: CitiesRepositoryMock;
let updateCandidatesService: UpdateCandidatesService;

describe('UpdateCandidatesService', () => {
  beforeEach(() => {
    candidatesRepositoryMock = new CandidatesRepositoryMock();
    citiesRepositoryMock = new CitiesRepositoryMock();

    updateCandidatesService = new UpdateCandidatesService(
      candidatesRepositoryMock,
    );
  });

  it('should update existing candidates', async () => {
    const oldCity = await citiesRepositoryMock.create('Recife', 'PE');
    const newCity = await citiesRepositoryMock.create('Porto Alegre', 'RS');

    const alreadyExistingCandidate = await candidatesRepositoryMock.create({
      // Recife - PE
      city_id: oldCity.id,
      recruiting_api_id: 1,
      experience: '4-5 years',
    });

    alreadyExistingCandidate.city = oldCity;

    const recruitingApiCandidateData: RecruitingApiCandidateDTO[] = [
      {
        city: 'Porto Alegre - RS',
        experience: '5+ years',
        technologies: [],
        id: 1,
      },
    ];

    const updatedCandidates = await updateCandidatesService.execute(
      recruitingApiCandidateData,
      [alreadyExistingCandidate],
      [oldCity, newCity],
    );

    expect(updatedCandidates[0].city_id).not.toBe(oldCity.id);
    expect(updatedCandidates[0].end_experience_range).toBe(0);
    expect(updatedCandidates[0].start_experience_range).toBe(5);
    expect(updatedCandidates[0].city_id).toBe(newCity.id);
  });

  it('should not update candidate when could not find it by id', async () => {
    const oldCity = await citiesRepositoryMock.create('Recife', 'PE');
    const newCity = await citiesRepositoryMock.create('Porto Alegre', 'RS');

    const alreadyExistingCandidate = await candidatesRepositoryMock.create({
      // Recife - PE
      city_id: oldCity.id,
      recruiting_api_id: 1,
      experience: '4-5 years',
    });

    alreadyExistingCandidate.city = oldCity;

    const recruitingApiCandidateData: RecruitingApiCandidateDTO[] = [
      {
        city: 'Porto Alegre - RS',
        experience: '5+ years',
        technologies: [],
        id: 0,
      },
    ];

    const updatedCandidates = await updateCandidatesService.execute(
      recruitingApiCandidateData,
      [alreadyExistingCandidate],
      [oldCity, newCity],
    );

    expect(updatedCandidates[0].city_id).toBe(oldCity.id);
    expect(updatedCandidates[0].start_experience_range).toBe(4);
    expect(updatedCandidates[0].end_experience_range).toBe(5);
  });

  it('should not update candidate city when its the same', async () => {
    const oldCity = await citiesRepositoryMock.create('Recife', 'PE');
    // const newCity = await citiesRepositoryMock.create('Porto Alegre', 'RS');

    const alreadyExistingCandidate = await candidatesRepositoryMock.create({
      // Recife - PE
      city_id: oldCity.id,
      recruiting_api_id: 1,
      experience: '4-5 years',
    });

    alreadyExistingCandidate.city = oldCity;

    const recruitingApiCandidateData: RecruitingApiCandidateDTO[] = [
      {
        city: 'Recife - PE',
        experience: '5+ years',
        technologies: [],
        id: 0,
      },
    ];

    const updatedCandidates = await updateCandidatesService.execute(
      recruitingApiCandidateData,
      [alreadyExistingCandidate],
      [oldCity],
    );

    expect(updatedCandidates[0].city_id).toBe(oldCity.id);
  });

  it('should not update candidate city when its not found', async () => {
    const oldCity = await citiesRepositoryMock.create('Recife', 'PE');
    // const newCity = await citiesRepositoryMock.create('Porto Alegre', 'RS');

    const alreadyExistingCandidate = await candidatesRepositoryMock.create({
      // Recife - PE
      city_id: oldCity.id,
      recruiting_api_id: 1,
      experience: '4-5 years',
    });

    alreadyExistingCandidate.city = oldCity;

    const recruitingApiCandidateData: RecruitingApiCandidateDTO[] = [
      {
        city: 'Porto Alegre - ss',
        experience: '5+ years',
        technologies: [],
        id: 1,
      },
    ];

    const updatedCandidates = await updateCandidatesService.execute(
      recruitingApiCandidateData,
      [alreadyExistingCandidate],
      [oldCity],
    );

    expect(updatedCandidates[0].city_id).toBe(oldCity.id);
  });
});
