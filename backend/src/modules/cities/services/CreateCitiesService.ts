import getCityAndStateFromRecruitingApiCity from '@shared/utils/getCityAndStateFromRecruitingApiCity';
import { inject, injectable } from 'tsyringe';
import City from '../infra/typeorm/entities/City.entity';
import ICitiesRepository from '../repositories/ICitiesRepository';

@injectable()
class CreateCitiesService {
  constructor(
    @inject('CitiesRepository')
    private readonly citiesRepository: ICitiesRepository,
  ) {}

  public async execute(
    recruitingApiCitiesNames: string[],
  ): Promise<City[] | undefined> {
    // check for existing ones
    const existingCities = await this.citiesRepository.getCitiesByNameAndStateInitials(
      Array.from(
        recruitingApiCitiesNames.map(city =>
          getCityAndStateFromRecruitingApiCity(city),
        ),
      ),
    );

    let citiesNamesToCreate: string[];

    if (!existingCities || existingCities.length <= 0) {
      citiesNamesToCreate = recruitingApiCitiesNames;
    } else {
      citiesNamesToCreate = recruitingApiCitiesNames.filter(
        recruitingApiCityName =>
          !existingCities
            .map(existingCity => existingCity.getCityWithState().toUpperCase())
            .includes(recruitingApiCityName.toUpperCase()),
      );
    }

    // should only create when needed
    if (!citiesNamesToCreate || citiesNamesToCreate.length <= 0) return;

    const citiesToCreate: City[] = citiesNamesToCreate.map(cityName => {
      const newCity = new City();

      const cityAndState = getCityAndStateFromRecruitingApiCity(cityName);

      newCity.name = cityAndState[0].toUpperCase();
      newCity.state_initials = cityAndState[1].toUpperCase();

      return newCity;
    });

    return await this.citiesRepository.saveAll(citiesToCreate);
  }
}

export default CreateCitiesService;
