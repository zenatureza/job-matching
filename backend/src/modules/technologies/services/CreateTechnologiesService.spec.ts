import TechnologiesRepositoryMock from '../repositories/mocks/TechnologiesRepositoryMock';
import CreateTechnologiesService from './CreateTechnologiesService';

let technologiesRepositoryMock: TechnologiesRepositoryMock;
let createTechnologiesService: CreateTechnologiesService;

describe('CreateTechnologiesService', () => {
  beforeEach(() => {
    technologiesRepositoryMock = new TechnologiesRepositoryMock();

    createTechnologiesService = new CreateTechnologiesService(
      technologiesRepositoryMock,
    );
  });

  it('should create unknown technologies', async () => {
    const createdTechnologies = await createTechnologiesService.execute([
      'React',
    ]);

    if (createdTechnologies) {
      expect(createdTechnologies[0]).toHaveProperty('id');
      expect(createdTechnologies[0].name).toBe('React');
    }
  });

  it('should not create already existing technology', async () => {
    await technologiesRepositoryMock.create({
      name: 'Python',
    });

    const createdTechnologies = await createTechnologiesService.execute([
      'Python',
    ]);

    expect(createdTechnologies).toBeUndefined();
  });
});
