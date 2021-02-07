import City from '@modules/cities/infra/typeorm/entities/City.entity';
import getCityAndStateFromRecruitingApiCity from '@shared/utils/getCityAndStateFromRecruitingApiCity';
import getCityWithState from '@shared/utils/getCityWithState';
import { inject, injectable } from 'tsyringe';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import Candidate from '../infra/typeorm/entities/Candidate.entity';
import ICandidatesRepository from '../repositories/ICandidatesRepository';
import UpdateCandidatesService from './UpdateCandidatesService';

@injectable()
class CreateOrUpdateCandidatesService {
  constructor(
    @inject('CandidatesRepository')
    private readonly candidatesRepository: ICandidatesRepository,

    @inject('UpdateCandidatesService')
    private readonly updateCandidatesService: UpdateCandidatesService,
  ) {}

  public async execute(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
    candidatesCities: City[],
  ): Promise<Candidate[] | undefined> {
    // check for existing ones
    const existingCandidates = await this.candidatesRepository.findByIds(
      recruitingApiCandidates.map(candidate => candidate.id),
    );

    let candidatesToCreate: Candidate[] = [];

    // should create all recruiting api candidates
    if (!existingCandidates || existingCandidates.length <= 0) {
      candidatesToCreate = this.getCandidatesFromRecruitingApiCandidates(
        recruitingApiCandidates,
        candidatesCities,
      );
    } else {
      const nonExistingCandidatesDTO = recruitingApiCandidates.filter(
        recruitingApiCandidate =>
          !existingCandidates
            .map(existingCandidate => existingCandidate.recruiting_api_id)
            .includes(recruitingApiCandidate.id),
      );

      candidatesToCreate = this.getCandidatesFromRecruitingApiCandidates(
        nonExistingCandidatesDTO,
        candidatesCities,
      );

      // should update already existing candidates
      const alreadyExistingCandidatesDTO = recruitingApiCandidates.filter(
        recruitingApiCandidate =>
          existingCandidates
            .map(existingCandidate => existingCandidate.recruiting_api_id)
            .includes(recruitingApiCandidate.id),
      ) as any;

      await this.updateCandidatesService.execute(
        alreadyExistingCandidatesDTO,
        existingCandidates,
        candidatesCities,
      );
    }

    return await this.candidatesRepository.save(candidatesToCreate);
  }

  private getCandidatesFromRecruitingApiCandidates(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
    candidatesCities: City[],
  ): Candidate[] {
    const result = recruitingApiCandidates.map(apiCandidate => {
      const newCandidate = new Candidate(
        apiCandidate.experience,
        undefined,
        apiCandidate.id,
      );

      const cityAndState = getCityAndStateFromRecruitingApiCity(
        apiCandidate.city,
      );

      const candidateCity = candidatesCities.find(
        city =>
          city.getCityWithState() ===
          getCityWithState(cityAndState[0], cityAndState[1]),
      );

      if (candidateCity) {
        newCandidate.city_id = candidateCity.id;
      }

      return newCandidate;
    });

    return result;
  }
}

export default CreateOrUpdateCandidatesService;
