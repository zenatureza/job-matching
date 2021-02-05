import City from '../infra/typeorm/entities/City.entity';

export default interface ICitiesRepository {
  getCitiesByNameAndStateInitials(
    namesAndStateInitials: [string, string][],
  ): Promise<City[] | undefined>;
}
