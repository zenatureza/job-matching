import CitiesRepositoryMock from '../repositories/mocks/CitiesRepositoryMock';

let citiesRepositoryMock: CitiesRepositoryMock;

describe('GetCityByFilterService', () => {
  beforeEach(() => {
    citiesRepositoryMock = new CitiesRepositoryMock();
  });

  it('all cities should contain filter', async () => {
    await citiesRepositoryMock.create('São Paulo', 'SP');
    await citiesRepositoryMock.create('São Bento', 'MG');

    const cities = await citiesRepositoryMock.findByFilter('São');

    expect(cities.length).toBe(2);
    cities
      .map(city => city.getCityWithState())
      .forEach(city => {
        expect(city).toContain('São'.toUpperCase());
      });
  });
});
