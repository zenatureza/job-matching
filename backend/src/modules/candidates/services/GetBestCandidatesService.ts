import GetDataFromRecruitingApiService from '@modules/recruitingApi/services/GetDataFromRecruitingApiService';
import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import { inject, injectable } from 'tsyringe';
import CandidateDTO from '../dtos/CandidateDTO';
import CalculateBestCandidatesService from './CalculateBestCandidatesService';
import SaveCandidatesService from './SaveCandidatesService';

// TODO: should be this format?
interface IRequest {
  // TODO: can be a number
  city: string;

  // TODO: Can be a range (from = 4, to = 5 <==> 4-5 years)
  experience: string;

  // TODO: Could be { tech_id, is_main_tech }
  // technologies: RecruitingApiCandidateTechnologyDTO[];
  technologiesNames: string[];
}

/**
 * Should return best matches
 */
@injectable()
class GetBestCandidatesService {
  constructor(
    @inject('GetDataFromRecruitingApiService')
    private getDataFromRecruitingApiService: GetDataFromRecruitingApiService,

    @inject('SaveCandidatesService')
    private saveCandidatesService: SaveCandidatesService,

    @inject('CalculateBestCandidatesService')
    private calculateBestCandidatesService: CalculateBestCandidatesService,
  ) {}

  public async execute({
    city,
    experience,
    technologiesNames,
  }: IRequest): Promise<CandidateDTO[] | undefined> {
    const recruitingApiData = await this.getDataFromRecruitingApiService.execute();

    // if (
    //   recruitingApiData &&
    //   recruitingApiData.candidates &&
    //   recruitingApiData.jobs
    // ) {
    //   await this.saveCandidatesService.execute(recruitingApiData.candidates);
    // }
    const technologies: RecruitingApiCandidateTechnologyDTO[] = technologiesNames.map(
      tech => {
        return {
          name: tech,
          is_main_tech: false,
        };
      },
    );

    const bestCandidates = await this.calculateBestCandidatesService.execute({
      city,
      experience,
      technologies,
    });
    console.log(bestCandidates);

    return;

    // TODO: Should call python api?
    // const bestCandidates = await this.calculateBestCandidatesService.execute({
    //   city,
    //   experience,
    //   technologies,
    // });

    // return bestCandidates?.map(candidate => {
    //   return {
    //     city: candidate.city.getCityWithState(),
    //     experience: candidate.getExperience(),
    //     technologies: candidate.technologies.map(candidateTech => {
    //       const tech = candidateTech.technology;

    //       return {
    //         name: tech.name,
    //         is_main_tech: candidateTech.is_main_tech,
    //       };
    //     }),
    //   };
    // });

    // try {
    // } catch (error) {
    //   // TODO: handle could not get most updated data - should not stop program execution
    //   console.log(error);
    //   // TODO: should log this problem
    // } finally {
    // }
  }
}

export default GetBestCandidatesService;
