import TechnologiesRepositoryMock from '../repositories/mocks/TechnologiesRepositoryMock';

let technologiesRepositoryMock: TechnologiesRepositoryMock;

describe('GetTechnologiesService', () => {
  beforeEach(() => {
    technologiesRepositoryMock = new TechnologiesRepositoryMock();
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

    const techs = await technologiesRepositoryMock.getAll();

    expect(techs.length).toBe(2);
  });
});
