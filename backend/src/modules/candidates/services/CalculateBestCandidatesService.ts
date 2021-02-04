import GetDataFromRecruitingApiService from '@modules/recruitingApi/services/GetDataFromRecruitingApiService';
import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import AppError from '@shared/errors/AppError';
import { recruitingApi } from '@shared/infra/http/recruitingApi';
import RecruitingApiResponse from '@shared/infra/http/recruitingApi/RecruitingApiResponse.interface';
import { inject, injectable } from 'tsyringe';
import CandidateDTO from '../dtos/CandidateDTO';

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
  constructor() {}

  public async execute({
    city,
    experience,
    technologies,
  }: IRequest): Promise<CandidateDTO[] | undefined> {
    return undefined;
  }
}

export default CalculateBestCandidatesService;
