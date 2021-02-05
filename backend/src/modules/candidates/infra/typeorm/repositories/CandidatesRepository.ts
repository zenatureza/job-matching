import ICandidatesRepository from '@modules/candidates/repositories/ICandidatesRepository';
import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import getCityAndStateFromRecruitingApiCity from '@shared/utils/getCityAndStateFromRecruitingApiCity';
import getExperienceRange from '@shared/utils/getExperienceRange';
import { getRepository, In, Repository } from 'typeorm';
import Candidate from '../entities/Candidate.entity';

class CandidatesRepository implements ICandidatesRepository {
  private ormRepository: Repository<Candidate>;

  constructor() {
    this.ormRepository = getRepository(Candidate);
  }

  public async save(
    recruitingApiCandidates: Candidate[],
  ): Promise<Candidate[] | undefined> {
    return await this.ormRepository.save(recruitingApiCandidates);
  }

  public async findByIds(ids: number[]): Promise<Candidate[] | undefined> {
    return await this.ormRepository.find({
      recruiting_api_id: In(ids),
    });
  }

  public async findByFilters(
    city: string,
    experience: string,
    technologies: RecruitingApiCandidateTechnologyDTO[],
  ): Promise<Candidate[] | undefined> {
    const cityAndState = getCityAndStateFromRecruitingApiCity(city);
    const [start, _] = getExperienceRange(experience);

    // const candidateTechs = technologies.map

    // return await this.ormRepository.find({
    //   city: {
    //     name: cityAndState[0],
    //     state_initials: cityAndState[1],
    //   },
    //   start_experience_range: start,
    //   end_experience_range: end,
    //   // technologies: {

    //   // }
    // });
    const techNamesParam = technologies.map(tech => tech.name).join(', ');

    return await this.ormRepository.query(
      `
      SELECT
        *
      FROM  "candidates" AS candidate
      JOIN  "cities" AS city ON
        city.name = $1
        AND city.state_initials = $2
      JOIN  "technologies" AS tech ON
        tech.name IN ($3)
      WHERE
        candidate.start_experience_range >= $4
    `,
      [cityAndState[0], cityAndState[1], techNamesParam, start],
    );
  }
}

export default CandidatesRepository;
