import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import { getRepository, In, Repository } from 'typeorm';
import Technology from '../entities/Technology.entity';

class TechnologiesRepository implements ITechnologiesRepository {
  private ormRepository: Repository<Technology>;

  constructor() {
    this.ormRepository = getRepository(Technology);
  }

  public async findByNames(
    techNames: string[],
  ): Promise<Technology[] | undefined> {
    return await this.ormRepository.find({
      name: In(techNames),
    });
  }
}

export default TechnologiesRepository;
