import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import Candidate from '../infra/typeorm/repositories/entities/Candidate.entity';

export default interface ICandidatesRepository {
  // TODO:
  // save();
  findByIds(ids: number[]): Promise<Candidate[] | undefined>;

  save(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
  ): Promise<Candidate[] | undefined>;
}
