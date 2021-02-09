import City from '../infra/typeorm/entities/City.entity';

export default interface ICitiesRepository {
  create(cityName: string, stateInitials: string): Promise<City>;
  getCitiesByNameAndStateInitials(
    namesAndStateInitials: [string, string][],
  ): Promise<City[] | undefined>;
  saveAll(cities: City[]): Promise<City[]>;
  findByFilter(filter: string): Promise<City[]>;
  findById(cityId: string): Promise<City | undefined>;
}
