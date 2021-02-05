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

      // const result = await this.ormRepository.find({
      //   // relations: ['technology'],
      //   where: {
      //     technology: {
      //       name: 'React',
      //       // id:
      //       // id: 'd79cfdf9-f361-4cf3-835c-be1280cf0949',
      //     },
      //   },
      // });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CandidatesTechnologiesRepository;
