import Candidate from '@modules/candidates/infra/typeorm/entities/Candidate.entity';
import City from '@modules/cities/infra/typeorm/entities/City.entity';
import ICitiesRepository from '../ICitiesRepository';

import { v4 as uuid_v4 } from 'uuid';

export default class CitiesRepositoryMock implements ICitiesRepository {
  private cities: City[] = [];

  public async create(cityName: string, stateInitials: string): Promise<City> {
    const newCity = new City();

    Object.assign(newCity, {
      id: uuid_v4(),
      name: cityName,
      state_initials: stateInitials,
    });

    this.cities.push(newCity);

    return newCity;
  }

  public async getCitiesByNameAndStateInitials(
    namesAndStateInitials: [string, string][],
  ): Promise<City[] | undefined> {
    // console.log(this.cities);

    return this.cities.filter(city => {
      const found = namesAndStateInitials.find(
        nameAndState =>
          nameAndState[0].toUpperCase() === city.name.toUpperCase() &&
          nameAndState[1].toUpperCase() === city.state_initials.toUpperCase(),
      );

      return !!found;
    });
  }

  public async saveAll(cities: City[]): Promise<City[]> {
    const createdCitiesPromises = cities.map(async city => {
      return await this.create(city.name, city.state_initials);
    });

    const createdCities = await Promise.all(createdCitiesPromises);

    return createdCities;
  }
}
