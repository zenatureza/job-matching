import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import TechnologiesRepository from '@modules/technologies/infra/typeorm/repositories/TechnologiesRepository';
import { inject, injectable } from 'tsyringe';
import JobMatchingCalculatorHttpClient from '../infra/http/JobMatchingCalculatorHttpClient';
import Candidate from '../infra/typeorm/entities/Candidate.entity';
import CandidatesRepository from '../infra/typeorm/repositories/CandidatesRepository';

// TODO: should be this format?
interface IRequest {
  // TODO: can be a number
  city: string;

  // TODO: Can be a range (from = 4, to = 5 <==> 4-5 years)
  experience: string;

  // TODO: Could be { tech_id, is_main_tech }
  technologies: RecruitingApiCandidateTechnologyDTO[];
}

/**
 * Should return best matches
 */
@injectable()
class CalculateBestCandidatesService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: CandidatesRepository,

    @inject('TechnologiesRepository')
    private technologiesRepository: TechnologiesRepository,

    @inject('JobMatchingCalculatorHttpClient')
    private jobMatchingCalculatorHttpClient: JobMatchingCalculatorHttpClient,
  ) {}

  public async execute({
    city,
    experience,
    technologies,
  }: IRequest): Promise<Candidate[] | undefined> {
    // 1. should try to retreive candidates with the request parameters
    // const candidatesInCityWithExperience = await this.candidatesRepository.findByFilters(
    //   city,
    //   experience,
    //   technologies,
    // );

    // return candidatesInCityWithExperience;
    const response = await this.jobMatchingCalculatorHttpClient.getData();
    console.log(response);

    return;
  }
}

export default CalculateBestCandidatesService;
