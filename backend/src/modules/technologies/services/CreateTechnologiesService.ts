import e from 'express';
import { inject, injectable } from 'tsyringe';
import Technology from '../infra/typeorm/entities/Technology.entity';
import ITechnologiesRepository from '../repositories/ITechnologiesRepository';

@injectable()
class CreateTechnologiesService {
  constructor(
    @inject('TechnologiesRepository')
    private technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute(
    recruitingApiCandidatesTechnologiesNames: string[],
  ): Promise<Technology[] | undefined> {
    // check for existing ones
    const existingTechnologies = await this.technologiesRepository.findByNames(
      Array.from(recruitingApiCandidatesTechnologiesNames),
    );

    let technologiesNamesToCreate: string[];

    if (!existingTechnologies || existingTechnologies.length <= 0) {
      technologiesNamesToCreate = recruitingApiCandidatesTechnologiesNames;
    } else {
      technologiesNamesToCreate = recruitingApiCandidatesTechnologiesNames.filter(
        recruitingApiTechName =>
          !existingTechnologies
            .map(existingTech => existingTech.name)
            .includes(recruitingApiTechName),
      );
    }

    // should only create when needed
    if (!technologiesNamesToCreate || technologiesNamesToCreate.length <= 0)
      return;

    const technologiesToCreate: Technology[] = technologiesNamesToCreate.map(
      techName => {
        const newTech = new Technology();
        newTech.name = techName;

        return newTech;
      },
    );

    return await this.technologiesRepository.saveAll(technologiesToCreate);
  }
}

export default CreateTechnologiesService;
