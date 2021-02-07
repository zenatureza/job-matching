import CandidateTechnology from '../infra/typeorm/entities/CandidateTechnology.entity';

export default interface ICandidateTechnologyRepository {
  findByTechnologiesNames(
    techs: string[],
  ): Promise<CandidateTechnology[] | undefined>;
  create(
    techId: string,
    candidateId: string,
    recruitingApiId: number,
    isMainTech: boolean,
  ): Promise<CandidateTechnology>;
  save(
    candidatesTechnologies: CandidateTechnology[],
  ): Promise<CandidateTechnology[]>;
}
