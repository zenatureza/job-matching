import { inject, injectable } from 'tsyringe';
import Technology from '../infra/typeorm/entities/Technology.entity';
import ITechnologiesRepository from '../repositories/ITechnologiesRepository';

@injectable()
class GetTechnologiesService {
  constructor(
    @inject('TechnologiesRepository')
    private readonly technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute(): Promise<Technology[]> {
    return await this.technologiesRepository.getAll();
  }
}

export default GetTechnologiesService;
