import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import { getRepository, Repository } from 'typeorm';
import City from '../entities/City.entity';

class CitiesRepository implements ICitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }
  public async getCitiesByNameAndStateInitials(
    namesAndStateInitials: [string, string][],
  ): Promise<City[] | undefined> {
    /**
     * e.g. nameAndStateInitials = [['Santiago', 'SC'], ['Santiago', 'RS']]
     * SELECT *
     * FROM 'cities'
     * WHERE ('name' = 'Santiago' AND 'state_initials' = 'SC')
     * OR ('name' = 'Santiago' AND 'state_initials' = 'RS')
     */

    // const result = await this.ormRepository.find({
    //   where: [
    //     namesAndStateInitials
    //       .filter(item => item[0] && item[1])
    //       .map(item => {
    //         return { name: item[0], state_initials: item[1] };
    //       }),
    //   ],
    // });
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
}

export default CitiesRepository;
