import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import { getRepository, ILike, Raw, Repository } from 'typeorm';
import City from '../entities/City.entity';

class CitiesRepository implements ICitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }
  public async getCitiesByNameAndStateInitials(
    namesAndStateInitials: [string, string][],
  ): Promise<City[] | undefined> {
    const queryParams = namesAndStateInitials.map(nameAndState => {
      return {
        name: nameAndState[0].toUpperCase(),
        state_initials: nameAndState[1].toUpperCase(),
      };
    });

    const result = await this.ormRepository.find({
      where: queryParams,
    });

    return result;
  }

  public async create(cityName: string, stateInitials: string): Promise<City> {
    throw new Error('Method not implemented.');
  }

  public async saveAll(cities: City[]): Promise<City[]> {
    throw new Error('Method not implemented.');
  }

  public async findByFilter(filter: string): Promise<City[]> {
    const result = await this.ormRepository.find({
      where: {
        // name: ILike(filter),
        name: Raw(alias => `${alias} ILIKE '%${filter}%'`),
      },
    });
    console.log(result);

    return result;
  }

  public async findById(cityId: string) {
    return await this.ormRepository.findOne({
      id: cityId,
    });
  }
}

export default CitiesRepository;
