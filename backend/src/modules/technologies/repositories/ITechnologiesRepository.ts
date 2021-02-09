import RecruitingApiCandidateTechnologyDTO from '../dtos/RecruitingApiCandidateTechnologyDTO';
import Technology from '../infra/typeorm/entities/Technology.entity';

export default interface ITechnologiesRepository {
  findByNames(techNames: string[]): Promise<Technology[] | undefined>;
  saveAll(technologies: Technology[]): Promise<Technology[]>;
  create(
    technologyDTO: RecruitingApiCandidateTechnologyDTO,
  ): Promise<Technology>;
  getAll(): Promise<Technology[]>;
}
