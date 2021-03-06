import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import Candidate from '../infra/typeorm/entities/Candidate.entity';

export default interface ICandidatesRepository {
  /** Finds by recruiting api ids */
  findByIds(ids: number[]): Promise<Candidate[] | undefined>;

  save(recruitingApiCandidates: Candidate[]): Promise<Candidate[]>;

  findByFilters(
    city: string,
    experience: string,
    technologies: RecruitingApiCandidateTechnologyDTO[],
  ): Promise<Candidate[] | undefined>;
}
