import { v4 as uuid_v4 } from 'uuid';

import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import Technology from '@modules/technologies/infra/typeorm/entities/Technology.entity';
import ITechnologiesRepository from '../ITechnologiesRepository';

export default class TechnologiesRepositoryMock
  implements ITechnologiesRepository {
  private technologies: Technology[] = [];

  constructor(technologiesDb?: Technology[]) {
    if (!technologiesDb) return;

    this.technologies = technologiesDb;
  }

  public async create({
    name,
  }: RecruitingApiCandidateTechnologyDTO): Promise<Technology> {
    const newTechnology = new Technology();

    Object.assign(newTechnology, { id: uuid_v4(), name });

    this.technologies.push(newTechnology);

    return newTechnology;
  }

  public async findByNames(
    techNames: string[],
  ): Promise<Technology[] | undefined> {
    return this.technologies.filter(dbTech => techNames.includes(dbTech.name));
  }

  public async saveAll(technologies: Technology[]): Promise<Technology[]> {
    const createdTechsPromises = technologies.map(async tech => {
      return await this.create({ name: tech.name, is_main_tech: false });
    });

    const createdTechs = await Promise.all(createdTechsPromises);

    return createdTechs;
  }

  public async getAll() {
    return this.technologies;
  }
}
