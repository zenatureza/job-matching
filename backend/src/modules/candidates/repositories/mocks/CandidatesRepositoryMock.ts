import RecruitingApiCandidateDTO from '@modules/candidates/dtos/RecruitingApiCandidateDTO';
import Candidate from '@modules/candidates/infra/typeorm/repositories/entities/Candidate.entity';
import ICandidatesRepository from '../ICandidatesRepository';

export default class CandidatesRepositoryMock implements ICandidatesRepository {
  private candidates: Candidate[] = [];

  public async save(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
  ): Promise<Candidate[] | undefined> {
    throw new Error('Method not implemented.');
  }

  public async findByIds(ids: number[]): Promise<Candidate[] | undefined> {
    throw new Error('Method not implemented.');
  }
}
