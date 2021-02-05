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
    return this.ormRepository.find({
      where: [
        namesAndStateInitials.map(item => {
          return { name: item[0], state_initials: item[1] };
        }),
      ],
    });
  }
}

export default CitiesRepository;
