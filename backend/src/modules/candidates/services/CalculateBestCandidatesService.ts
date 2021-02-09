import { inject, injectable } from 'tsyringe';
import JobMatchingCalculatorHttpClient from '../infra/http/JobMatchingCalculatorHttpClient';
import { IRequest } from '../infra/http/JobMatchingCalculatorHttpClient/IJobMatchingCalculatorHttpClient';
import JobMatchingCalculatorResponse from '../infra/http/JobMatchingCalculatorHttpClient/JobMatchingCalculatorResponse.interface';

/**
 * Should return best matches
 */
@injectable()
class CalculateBestCandidatesService {
  constructor(
    @inject('JobMatchingCalculatorHttpClient')
    private readonly jobMatchingCalculatorHttpClient: JobMatchingCalculatorHttpClient,
  ) {}

  public async execute({
    cityId,
    startExperienceRange,
    endExperienceRange,
    technologiesIds,
    stateInitials,
  }: IRequest): Promise<JobMatchingCalculatorResponse> {
    const response = await this.jobMatchingCalculatorHttpClient.getData({
      cityId,
      startExperienceRange,
      endExperienceRange,
      technologiesIds,
      stateInitials,
    });

    return response.data;
  }
}

export default CalculateBestCandidatesService;
