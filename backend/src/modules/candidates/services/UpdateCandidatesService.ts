import City from '@modules/cities/infra/typeorm/entities/City.entity';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import Technology from '@modules/technologies/infra/typeorm/entities/Technology.entity';
import getCityAndStateFromRecruitingApiCity from '@shared/utils/getCityAndStateFromRecruitingApiCity';
import getExperienceRange from '@shared/utils/getExperienceRange';
import { inject, injectable } from 'tsyringe';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import Candidate from '../infra/typeorm/entities/Candidate.entity';
import CandidateTechnology from '../infra/typeorm/entities/CandidateTechnology.entity';
import ICandidatesRepository from '../repositories/ICandidatesRepository';
import ICandidatesTechnologiesRepository from '../repositories/ICandidatesTechnologiesRepository';

/**
 * Should update db candidates with recruiting api data.
 */
// TODO: add tests
@injectable()
class UpdateCandidatesService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidatesRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('CandidatesTechnologiesRepository')
    private candidatesTechnologiesRepository: ICandidatesTechnologiesRepository,
  ) {}

  public async execute(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
  ): Promise<void> {
    // finds cities to possibly update candidates which moved
    const citiesWithStates = recruitingApiCandidates.map(candidate =>
      getCityAndStateFromRecruitingApiCity(candidate.city),
    );

    const candidatesCities = await this.citiesRepository.getCitiesByNameAndStateInitials(
      citiesWithStates,
    );

    // searches for technologies
    let candidatesTechnologiesNames: string[] = [];
    recruitingApiCandidates.forEach(candidate => {
      candidatesTechnologiesNames.concat(
        candidate.technologies.map(tech => tech.name),
      );
    });

    const candidatesTechnologies = await this.candidatesTechnologiesRepository.findByTechnologiesNames(
      candidatesTechnologiesNames,
    );

    const technologies = candidatesTechnologies?.map(
      candidateTech => candidateTech.technology,
    );

    // TODO: Handle candidatesCities === undefined

    // get existing candidates
    const recruitingApiCandidatesIds = recruitingApiCandidates.map(
      item => item.id,
    );

    let existingCandidatesDb = await this.candidatesRepository.findByIds(
      recruitingApiCandidatesIds,
    );

    // update existing candidates
    if (existingCandidatesDb) {
      existingCandidatesDb = existingCandidatesDb.map(dbCandidate => {
        const apiCandidate = recruitingApiCandidates.find(
          apiCandidate => apiCandidate.id === dbCandidate.recruiting_api_id,
        );

        if (apiCandidate) {
          const [start, end] = getExperienceRange(apiCandidate.experience);

          dbCandidate.start_experience_range = start;
          dbCandidate.end_experience_range = end;

          if (dbCandidate.city.getCityWithState() !== apiCandidate.city) {
            const cityAndState = getCityAndStateFromRecruitingApiCity(
              apiCandidate.city,
            );

            const city = candidatesCities?.find(
              city =>
                city.name === cityAndState[0] &&
                city.state_initials === cityAndState[1],
            );

            if (city) {
              dbCandidate.city = city;
            }
          }

          // before = [ { name: 'C#', is_main_tech: false }, { name: 'Python, is_main_tech: true } ]
          // after = [ { name: 'C#', is_main_tech: true }, { name: 'Python, is_main_tech: false } ]
          const newCandidateTechnologies = candidatesTechnologies?.filter(
            candidateTech =>
              candidateTech.recruiting_api_candidate_id === apiCandidate.id,
          );

          // update already existing candidate techs states
          dbCandidate.technologies.forEach(dbCandidateTech => {
            const newCandidateTechnology = newCandidateTechnologies?.find(
              item => item.technology.name === dbCandidateTech.technology.name,
            );

            // if existing candidates already has this tech, should only update 'is_main_tech' field
            if (!newCandidateTechnology) {
              return;
            }

            dbCandidateTech.is_main_tech = newCandidateTechnology.is_main_tech;
          });

          // creates new ones
          const technologiesToAdd = apiCandidate.technologies.filter(
            apiTech =>
              !dbCandidate.technologies
                .map(dbTech => dbTech.technology.name)
                .includes(apiTech.name),
          );

          technologiesToAdd.forEach(tech => {
            const techData = technologies?.find(t => t.name === tech.name);

            if (!techData) {
              return;
            }

            const newTech = new CandidateTechnology(
              techData,
              apiCandidate.id,
              dbCandidate.id,
            );

            dbCandidate.technologies.push(newTech);
          });
        }

        return dbCandidate;
      });

      await this.candidatesRepository.save(existingCandidatesDb);
    }

    // create
    const candidatesToCreate: RecruitingApiCandidateDTO[] = recruitingApiCandidates.filter(
      apiCandidate =>
        !existingCandidatesDb?.filter(
          existing => existing.recruiting_api_id === apiCandidate.id,
        ),
    );

    let newCandidates: Candidate[] = [];
    candidatesToCreate.forEach(newCandidateDTO => {
      let city = candidatesCities?.find(
        item => item.getCityWithState() == newCandidateDTO.city,
      );
      if (!city) {
        const cityAndState = getCityAndStateFromRecruitingApiCity(
          newCandidateDTO.city,
        );

        const newCity = new City();
        newCity.name = cityAndState[0];
        newCity.state_initials = cityAndState[1];

        city = newCity;

        // TODO: if city does not exists should create it
      }

      const [start, end] = getExperienceRange(newCandidateDTO.experience);

      let newCandidateTechnologies: CandidateTechnology[] = [];
      newCandidateDTO.technologies.forEach(tech => {
        let technology = technologies?.find(item => item.name === tech.name);

        if (!technology) {
          technology = new Technology();

          technology.name = tech.name;
        }

        const candidateTechnology = new CandidateTechnology(
          technology,
          newCandidateDTO.id,
        );
        newCandidateTechnologies.push(candidateTechnology);
      });

      const newCandidate: Candidate = new Candidate();

      newCandidate.city = city;
      (newCandidate.recruiting_api_id = newCandidateDTO.id),
        (newCandidate.start_experience_range = start),
        (newCandidate.end_experience_range = end),
        (newCandidate.technologies = newCandidateTechnologies);

      newCandidates.push(newCandidate);
    });

    await this.candidatesRepository.save(newCandidates);
  }
}

export default UpdateCandidatesService;
