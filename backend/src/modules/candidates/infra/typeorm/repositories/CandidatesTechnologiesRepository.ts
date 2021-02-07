import ICandidatesTechnologiesRepository from '@modules/candidates/repositories/ICandidatesTechnologiesRepository';
import { getRepository, Repository } from 'typeorm';
import CandidateTechnology from '../entities/CandidateTechnology.entity';

class CandidatesTechnologiesRepository
  implements ICandidatesTechnologiesRepository {
  private ormRepository: Repository<CandidateTechnology>;

  constructor() {
    this.ormRepository = getRepository(CandidateTechnology);
  }

  public async findByTechnologiesNames(
    technologiesNames: string[],
  ): Promise<CandidateTechnology[] | undefined> {
    try {
      const result = await this.ormRepository
        .createQueryBuilder('candidate_tech')
        .innerJoinAndSelect('candidate_tech.technology', 'tech')
        .where('tech.name in (:...names)', { names: technologiesNames })
        .printSql()
        .getMany();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async create(
    techId: string,
    candidateId: string,
    recruitingApiId: number,
    isMainTech: boolean,
  ): Promise<CandidateTechnology> {
    const newCandidateTechnology = this.ormRepository.create({
      technology_id: techId,
      candidate_id: candidateId,
      recruiting_api_candidate_id: recruitingApiId,
      is_main_tech: isMainTech,
    });

    return await this.ormRepository.save(newCandidateTechnology);
  }

  public async save(
    candidatesTechnologies: CandidateTechnology[],
  ): Promise<CandidateTechnology[]> {
    return await this.ormRepository.save(candidatesTechnologies);
  }
}

export default CandidatesTechnologiesRepository;
