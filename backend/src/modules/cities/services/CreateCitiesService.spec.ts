import CitiesRepositoryMock from '../repositories/mocks/CitiesRepositoryMock';
import CreateCitiesService from './CreateCitiesService';

let citiesRepositoryMock: CitiesRepositoryMock;
let createCitiesService: CreateCitiesService;

describe('CreateCitiesService', () => {
  beforeEach(() => {
    citiesRepositoryMock = new CitiesRepositoryMock();

    createCitiesService = new CreateCitiesService(citiesRepositoryMock);
  });

  it('should create unknown cities', async () => {
    const createdCities = await createCitiesService.execute(['Recife - PE']);

    if (createdCities) {
      expect(createdCities[0]).toHaveProperty('id');
      expect(createdCities[0].name).toBe('Recife');
      expect(createdCities[0].state_initials).toBe('PE');
    }
  });

  it('should not create already existing city', async () => {
    await citiesRepositoryMock.create('Recife', 'PE');

    const createdCities = await createCitiesService.execute([
      'Santa Maria - RS',
    ]);

    if (createdCities) {
      expect(createdCities[0].name).not.toBe('Recife');
      expect(createdCities[0].name).not.toBe('PE');
    }
  });
});
