import City from '@modules/cities/infra/typeorm/entities/City.entity';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import CreateCitiesService from '@modules/cities/services/CreateCitiesService';
import Technology from '@modules/technologies/infra/typeorm/entities/Technology.entity';
import CreateTechnologiesService from '@modules/technologies/services/CreateTechnologiesService';
import getCityAndStateFromRecruitingApiCity from '@shared/utils/getCityAndStateFromRecruitingApiCity';
import getExperienceRange from '@shared/utils/getExperienceRange';
import { inject, injectable } from 'tsyringe';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import Candidate from '../infra/typeorm/entities/Candidate.entity';
import CandidateTechnology from '../infra/typeorm/entities/CandidateTechnology.entity';
import ICandidatesRepository from '../repositories/ICandidatesRepository';
import ICandidatesTechnologiesRepository from '../repositories/ICandidatesTechnologiesRepository';
import CreateOrUpdateCandidatesService from './CreateOrUpdateCandidatesService';
import UpdateCandidatesTechnologiesService from './UpdateCandidatesTechnologiesService';

/**
 * Should update db candidates with recruiting api data.
 */
// TODO: add tests
@injectable()
class SaveCandidatesService {
  constructor(
    @inject('CitiesRepository')
    private readonly citiesRepository: ICitiesRepository,

    @inject('CreateTechnologiesService')
    private readonly createTechnologiesService: CreateTechnologiesService,

    @inject('CreateCandidatesService')
    private readonly createOrUpdateCandidatesService: CreateOrUpdateCandidatesService,

    @inject('CreateCitiesService')
    private readonly createCitiesService: CreateCitiesService,

    @inject('UpdateCandidatesTechnologiesService')
    private readonly updateCandidatesTechnologiesService: UpdateCandidatesTechnologiesService,
  ) {}

  public async execute(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
  ): Promise<void> {
    // TODO: should move candidatesTechnologiesNames inside this.createTechnologiesService.execute(techNamesToCreate)

    // searches for technologies
    let candidatesTechnologiesNames: string[] = [];
    recruitingApiCandidates.forEach(candidate => {
      candidate.technologies.forEach(tech => {
        candidatesTechnologiesNames.push(tech.name);
      });
    });

    // creates unknown technologies, if needed
    const techNamesToCreate = Array.from(new Set(candidatesTechnologiesNames));
    await this.createTechnologiesService.execute(techNamesToCreate);

    // creates unknown cities, if needed
    await this.createCitiesService.execute(
      recruitingApiCandidates.map(candidate => candidate.city),
    );

    // finds cities to possibly update candidates which moved
    const citiesWithStates = recruitingApiCandidates.map(candidate =>
      getCityAndStateFromRecruitingApiCity(candidate.city),
    );

    const candidatesCities = (await this.citiesRepository.getCitiesByNameAndStateInitials(
      citiesWithStates,
    )) as any;

    // should only create candidates when its cities are valid
    // console.log(candidatesCities);
    // if (!candidatesCities || candidatesCities.length <= 0) return;

    // creates unknown candidates and update already existing ones (except its techs)
    await this.createOrUpdateCandidatesService.execute(
      recruitingApiCandidates,
      candidatesCities,
    );

    // create or update candidates technologies
    await this.updateCandidatesTechnologiesService.execute(
      recruitingApiCandidates,
    );
  }
}

export default SaveCandidatesService;
