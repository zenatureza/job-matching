import { inject, injectable } from 'tsyringe';
import City from '../infra/typeorm/entities/City.entity';
import ICitiesRepository from '../repositories/ICitiesRepository';

@injectable()
class GetCityByFilterService {
  constructor(
    @inject('CitiesRepository')
    private readonly citiesRepository: ICitiesRepository,
  ) {}

  public async execute(filter: string): Promise<City[]> {
    return await this.citiesRepository.findByFilter(filter);
  }
}

export default GetCityByFilterService;
