import { inject, injectable } from 'tsyringe';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import ICandidatesRepository from '../repositories/ICandidatesRepository';

/**
 * Should update db candidates with recruiting api data,
 * if needed.
 */
@injectable()
class UpdateCandidatesService {
  constructor(
    @inject('CandidatesRepository')
    private CandidatesRepository: ICandidatesRepository,
  ) {}

  public async execute(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
  ): Promise<void> {}
}

export default UpdateCandidatesService;
