import ICandidatesTechnologiesRepository from '@modules/candidates/repositories/ICandidatesTechnologiesRepository';
import { getRepository, In, Repository } from 'typeorm';
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
    return await this.ormRepository.find({
      technology: {
        name: In(technologiesNames),
      },
    });
  }
}

export default CandidatesTechnologiesRepository;
