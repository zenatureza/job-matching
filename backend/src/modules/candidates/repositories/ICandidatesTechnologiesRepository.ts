import CandidateTechnology from '../infra/typeorm/entities/CandidateTechnology.entity';

export default interface ICandidateTechnologyRepository {
  findByTechnologiesNames(
    techs: string[],
  ): Promise<CandidateTechnology[] | undefined>;
}
