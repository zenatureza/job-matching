import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import { getRepository, In, Repository } from 'typeorm';
import Technology from '../entities/Technology.entity';

class TechnologiesRepository implements ITechnologiesRepository {
  private ormRepository: Repository<Technology>;

  constructor() {
    this.ormRepository = getRepository(Technology);
  }

  public async create({
    name,
  }: RecruitingApiCandidateTechnologyDTO): Promise<Technology> {
    const newTechnology = this.ormRepository.create({
      name,
    });

    return await this.ormRepository.save(newTechnology);
  }

  public async findByNames(
    techNames: string[],
  ): Promise<Technology[] | undefined> {
    return await this.ormRepository.find({
      name: In(techNames),
    });
  }

  public async saveAll(technologies: Technology[]) {
    technologies = await this.ormRepository.save(technologies);

    return technologies;
  }
}

export default TechnologiesRepository;
