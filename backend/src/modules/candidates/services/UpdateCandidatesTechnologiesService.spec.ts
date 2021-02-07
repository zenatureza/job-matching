import TechnologiesRepositoryMock from '@modules/technologies/repositories/mocks/TechnologiesRepositoryMock';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import CandidatesRepositoryMock from '../repositories/mocks/CandidatesRepositoryMock';
import CandidatesTechnologiesRepositoryMock from '../repositories/mocks/CandidatesTechnologiesRepositoryMock';
import UpdateCandidatesTechnologiesService from './UpdateCandidatesTechnologiesService';

let candidatesTechnologiesRepositoryMock: CandidatesTechnologiesRepositoryMock;
let candidatesRepositoryMock: CandidatesRepositoryMock;
let technologiesRepositoryMock: TechnologiesRepositoryMock;
let updateCandidatesTechnologiesService: UpdateCandidatesTechnologiesService;

describe('UpdateCandidatesTechnologiesService', () => {
  beforeEach(() => {
    candidatesTechnologiesRepositoryMock = new CandidatesTechnologiesRepositoryMock();
    candidatesRepositoryMock = new CandidatesRepositoryMock();
    technologiesRepositoryMock = new TechnologiesRepositoryMock();

    updateCandidatesTechnologiesService = new UpdateCandidatesTechnologiesService(
      candidatesTechnologiesRepositoryMock,
      candidatesRepositoryMock,
      technologiesRepositoryMock,
    );
  });

  it('should update candidate technology', async () => {
    const candidate = await candidatesRepositoryMock.create({
      city_id: '12812',
      recruiting_api_id: 10,
      experience: '4-5 years',
    });

    const pythonTech = await technologiesRepositoryMock.create({
      is_main_tech: false,
      name: 'Python',
    });

    const candidateTech = await candidatesTechnologiesRepositoryMock.create(
      pythonTech.id,
      '1221',
      10,
      false,
    );

    candidateTech.technology = pythonTech;
    candidate.technologies = [candidateTech];

    const recruitingApiCandidatesData: RecruitingApiCandidateDTO[] = [
      {
        city: 'Recife - PE',
        experience: '4-5 yeras',
        id: 10,
        technologies: [
          {
            name: 'Python',
            is_main_tech: true,
          },
        ],
      },
    ];

    const updatedCandidatesTechnologies = await updateCandidatesTechnologiesService.execute(
      recruitingApiCandidatesData,
    );

    if (updatedCandidatesTechnologies) {
      expect(updatedCandidatesTechnologies[0].is_main_tech).toBe(true);
    }
  });

  it('should return undefined when candidates were not found', async () => {
    // const candidate = await candidatesRepositoryMock.create({
    //   city_id: '12812',
    //   recruiting_api_id: 10,
    //   experience: '4-5 years',
    // });

    const pythonTech = await technologiesRepositoryMock.create({
      is_main_tech: false,
      name: 'Python',
    });

    const candidateTech = await candidatesTechnologiesRepositoryMock.create(
      pythonTech.id,
      '1221',
      10,
      false,
    );

    candidateTech.technology = pythonTech;
    // candidate.technologies = [candidateTech];

    const recruitingApiCandidatesData: RecruitingApiCandidateDTO[] = [
      {
        city: 'Recife - PE',
        experience: '4-5 yeras',
        id: 10,
        technologies: [
          {
            name: 'Python',
            is_main_tech: true,
          },
        ],
      },
    ];

    const updatedCandidatesTechnologies = await updateCandidatesTechnologiesService.execute(
      recruitingApiCandidatesData,
    );

    expect(updatedCandidatesTechnologies).toBeUndefined();
  });

  it('should return undefined when technologies were not found', async () => {
    const candidate = await candidatesRepositoryMock.create({
      city_id: '12812',
      recruiting_api_id: 10,
      experience: '4-5 years',
    });

    // const pythonTech = await technologiesRepositoryMock.create({
    //   is_main_tech: false,
    //   name: 'Python',
    // });

    const candidateTech = await candidatesTechnologiesRepositoryMock.create(
      // pythonTech.id,
      '10',
      '1221',
      10,
      false,
    );

    // candidateTech.technology = pythonTech;
    candidate.technologies = [candidateTech];

    const recruitingApiCandidatesData: RecruitingApiCandidateDTO[] = [
      {
        city: 'Recife - PE',
        experience: '4-5 yeras',
        id: 10,
        technologies: [
          {
            name: 'Python',
            is_main_tech: true,
          },
        ],
      },
    ];

    const updatedCandidatesTechnologies = await updateCandidatesTechnologiesService.execute(
      recruitingApiCandidatesData,
    );

    expect(updatedCandidatesTechnologies).toBeUndefined();
  });

  it('should return undefined when candidate was not found', async () => {
    const candidate = await candidatesRepositoryMock.create({
      city_id: '12812',
      recruiting_api_id: 11,
      experience: '4-5 years',
    });

    const pythonTech = await technologiesRepositoryMock.create({
      is_main_tech: false,
      name: 'Python',
    });

    const candidateTech = await candidatesTechnologiesRepositoryMock.create(
      pythonTech.id,
      // '10',
      '1221',
      11,
      false,
    );

    candidateTech.technology = pythonTech;
    candidate.technologies = [candidateTech];

    const recruitingApiCandidatesData: RecruitingApiCandidateDTO[] = [
      {
        city: 'Recife - PE',
        experience: '4-5 yeras',
        id: 25,
        technologies: [
          {
            name: 'Python',
            is_main_tech: true,
          },
        ],
      },
    ];

    const updatedCandidatesTechnologies = await updateCandidatesTechnologiesService.execute(
      recruitingApiCandidatesData,
    );

    expect(updatedCandidatesTechnologies).toBeUndefined();
  });

  it('should add candidate technology when it doesnt exist', async () => {
    const candidate = await candidatesRepositoryMock.create({
      city_id: '12812',
      recruiting_api_id: 11,
      experience: '4-5 years',
    });

    const pythonTech = await technologiesRepositoryMock.create({
      is_main_tech: false,
      name: 'Python',
    });

    const reactTech = await technologiesRepositoryMock.create({
      is_main_tech: false,
      name: 'React',
    });

    const candidateTech = await candidatesTechnologiesRepositoryMock.create(
      reactTech.id,
      // '10',
      '1221',
      11,
      false,
    );

    candidateTech.technology = reactTech;
    candidate.technologies = [candidateTech];

    const recruitingApiCandidatesData: RecruitingApiCandidateDTO[] = [
      {
        city: 'Recife - PE',
        experience: '4-5 yeras',
        id: 11,
        technologies: [
          {
            name: 'Python',
            is_main_tech: true,
          },
        ],
      },
    ];

    const updatedCandidatesTechnologies = await updateCandidatesTechnologiesService.execute(
      recruitingApiCandidatesData,
    );

    if (updatedCandidatesTechnologies) {
      expect(updatedCandidatesTechnologies[0].technology_id).toBe(
        pythonTech.id,
      );
    }
  });

  it('should return undefined when recruiting api tech data wasnt found', async () => {
    const candidate = await candidatesRepositoryMock.create({
      city_id: '12812',
      recruiting_api_id: 11,
      experience: '4-5 years',
    });

    const csharpTech = await technologiesRepositoryMock.create({
      is_main_tech: false,
      name: 'C#',
    });

    const reactTech = await technologiesRepositoryMock.create({
      is_main_tech: false,
      name: 'React',
    });

    const candidateTech = await candidatesTechnologiesRepositoryMock.create(
      reactTech.id,
      // '10',
      '1221',
      11,
      false,
    );

    candidateTech.technology = reactTech;
    candidate.technologies = [candidateTech];

    const recruitingApiCandidatesData: RecruitingApiCandidateDTO[] = [
      {
        city: 'Recife - PE',
        experience: '4-5 yeras',
        id: 11,
        technologies: [
          {
            name: 'Python',
            is_main_tech: true,
          },
        ],
      },
    ];

    const updatedCandidatesTechnologies = await updateCandidatesTechnologiesService.execute(
      recruitingApiCandidatesData,
    );

    expect(updatedCandidatesTechnologies).toBeUndefined();
  });
});
