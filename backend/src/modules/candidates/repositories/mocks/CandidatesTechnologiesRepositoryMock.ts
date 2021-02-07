import { v4 as uuid_v4 } from 'uuid';

import CandidateTechnology from '@modules/candidates/infra/typeorm/entities/CandidateTechnology.entity';
import ICandidateTechnologyRepository from '../ICandidatesTechnologiesRepository';

export default class CandidatesTechnologiesRepositoryMock
  implements ICandidateTechnologyRepository {
  private candidatesTechnologies: CandidateTechnology[] = [];

  public async findByTechnologiesNames(
    techs: string[],
  ): Promise<CandidateTechnology[] | undefined> {
    throw new Error('Method not implemented.');
  }

  public async create(
    techId: string,
    candidateId: string,
    recruitingApiId: number,
    isMainTech: boolean,
  ): Promise<CandidateTechnology> {
    const newCandidateTechnology = new CandidateTechnology(
      techId,
      recruitingApiId,
      candidateId,
    );

    Object.assign(newCandidateTechnology, {
      id: uuid_v4(),
      is_main_tech: isMainTech,
    });

    this.candidatesTechnologies.push(newCandidateTechnology);

    return newCandidateTechnology;
  }

  public async save(
    candidatesTechnologies: CandidateTechnology[],
  ): Promise<CandidateTechnology[]> {
    const createdCandidatesTechsPromises = candidatesTechnologies.map(
      async candidateTech => {
        return await this.create(
          candidateTech.technology_id,
          candidateTech.candidate_id,
          candidateTech.recruiting_api_candidate_id,
          candidateTech.is_main_tech,
        );
      },
    );

    const createdCandidatesTechs = await Promise.all(
      createdCandidatesTechsPromises,
    );

    return createdCandidatesTechs;
  }
}
