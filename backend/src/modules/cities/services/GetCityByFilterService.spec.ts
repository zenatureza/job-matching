import CitiesRepositoryMock from '../repositories/mocks/CitiesRepositoryMock';
import GetCityByFilterService from './GetCityByFilterService';

let citiesRepositoryMock: CitiesRepositoryMock;
let getCityByFilterService: GetCityByFilterService;

describe('GetCityByFilterService', () => {
  beforeEach(() => {
    citiesRepositoryMock = new CitiesRepositoryMock();

    getCityByFilterService = new GetCityByFilterService(citiesRepositoryMock);
  });

  it('all cities should contain filter', async () => {
    await citiesRepositoryMock.create('São Paulo', 'SP');
    await citiesRepositoryMock.create('São Bento', 'MG');

    // const cities = await citiesRepositoryMock.findByFilter('São');
    const cities = await getCityByFilterService.execute('São');

    expect(cities.length).toBe(2);
    cities
      .map(city => city.getCityWithState())
      .forEach(city => {
        expect(city).toContain('São'.toUpperCase());
      });
  });
});
