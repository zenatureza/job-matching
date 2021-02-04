import RecruitingApiCandidateDTO from '@modules/candidates/dtos/RecruitingApiCandidateDTO';
import ICandidatesRepository from '@modules/candidates/repositories/ICandidatesRepository';
import getExperienceRange from '@shared/utils/getExperienceRange';
import { getRepository, In, Repository } from 'typeorm';
import Candidate from './entities/Candidate.entity';

class CandidatesRepository implements ICandidatesRepository {
  private ormRepository: Repository<Candidate>;

  constructor() {
    this.ormRepository = getRepository(Candidate);
  }

  public async save(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
  ): Promise<Candidate[] | undefined> {
    const recruitingApiCandidatesIds = recruitingApiCandidates.map(
      item => item.id,
    );

    let recruitingApiCandidatesDb = await this.findByIds(
      recruitingApiCandidatesIds,
    );

    // TODO: should get all cities to use in update

    // update
    if (recruitingApiCandidatesDb) {
      recruitingApiCandidatesDb = recruitingApiCandidatesDb.map(dbCandidate => {
        const apiCandidate = recruitingApiCandidates.find(
          apiCandidate => apiCandidate.id === dbCandidate.recruiting_api_id,
        );

        if (apiCandidate) {
          const [start, end] = getExperienceRange(apiCandidate.experience);

          dbCandidate.start_experience_range = start;
          dbCandidate.end_experience_range = end;

          // TODO: update candidate city, if needed
          if (dbCandidate.city.getCityWithState() !== apiCandidate.city) {
            // dbCandidate.
          }

          // TODO: update candidate technologies
        }

        return dbCandidate;
      });
    }

    // create

    if (!recruitingApiCandidatesDb) return;

    return await this.ormRepository.save(recruitingApiCandidatesDb);
  }

  public async findByIds(ids: number[]): Promise<Candidate[] | undefined> {
    return await this.ormRepository.find({
      recruiting_api_id: In(ids),
    });
  }
}

export default CandidatesRepository;
