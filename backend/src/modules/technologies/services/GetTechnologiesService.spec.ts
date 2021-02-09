import TechnologiesRepositoryMock from '../repositories/mocks/TechnologiesRepositoryMock';
import GetTechnologiesService from './GetTechnologiesService';

let technologiesRepositoryMock: TechnologiesRepositoryMock;
let getTechnologiesService: GetTechnologiesService;

describe('GetTechnologiesService', () => {
  beforeEach(() => {
    technologiesRepositoryMock = new TechnologiesRepositoryMock();

    getTechnologiesService = new GetTechnologiesService(
      technologiesRepositoryMock,
    );
  });

  it('should get all techs', async () => {
    await technologiesRepositoryMock.create({
      is_main_tech: true,
      name: 'Python',
    });
    await technologiesRepositoryMock.create({
      is_main_tech: true,
      name: 'C#',
    });

    const techs = await getTechnologiesService.execute();

    expect(techs.length).toBe(2);
  });
});
