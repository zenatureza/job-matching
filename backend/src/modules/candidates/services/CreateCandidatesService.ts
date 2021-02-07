import City from '@modules/cities/infra/typeorm/entities/City.entity';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import getCityAndStateFromRecruitingApiCity from '@shared/utils/getCityAndStateFromRecruitingApiCity';
import getExperienceRange from '@shared/utils/getExperienceRange';
import { inject, injectable } from 'tsyringe';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import Candidate from '../infra/typeorm/entities/Candidate.entity';
import ICandidatesRepository from '../repositories/ICandidatesRepository';

@injectable()
class CreateCandidatesService {
  constructor(
    @inject('CandidatesRepository')
    private candidatesRepository: ICandidatesRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
  ): Promise<Candidate[] | undefined> {
    // check for existing ones
    const existingCandidates = await this.candidatesRepository.findByIds(
      recruitingApiCandidates.map(candidate => candidate.id),
    );

    const candidatesCities = await this.citiesRepository.getCitiesByNameAndStateInitials(
      recruitingApiCandidates.map(candidate =>
        getCityAndStateFromRecruitingApiCity(candidate.city),
      ),
    );

    if (!candidatesCities) {
      return;
    }

    let candidatesToCreate: Candidate[] = [];

    if (!existingCandidates || existingCandidates.length <= 0) {
      candidatesToCreate = this.getCandidatesFromRecruitingApiCandidates(
        recruitingApiCandidates,
        candidatesCities,
      );
    } else {
      const filteredCandidates = recruitingApiCandidates.filter(
        recruitingApiCandidate =>
          !existingCandidates
            .map(existingCandidate => existingCandidate.recruiting_api_id)
            .includes(recruitingApiCandidate.id),
      );

      candidatesToCreate = this.getCandidatesFromRecruitingApiCandidates(
        filteredCandidates,
        candidatesCities,
      );
    }

    return await this.candidatesRepository.save(candidatesToCreate);
  }

  private getCandidatesFromRecruitingApiCandidates(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
    candidatesCities: City[],
  ): Candidate[] {
    return recruitingApiCandidates.map(apiCandidate => {
      const newCandidate = new Candidate(
        apiCandidate.experience,
        undefined,
        apiCandidate.id,
      );

      const cityAndState = getCityAndStateFromRecruitingApiCity(
        apiCandidate.city,
      );

      const candidateCity = candidatesCities?.find(
        city =>
          city.name === cityAndState[0] &&
          city.state_initials === cityAndState[1],
      );

      if (candidateCity) {
        newCandidate.city_id = candidateCity.id;
      }

      newCandidate.recruiting_api_id = apiCandidate.id;

      const [start, end] = getExperienceRange(apiCandidate.experience);
      newCandidate.start_experience_range = start;
      newCandidate.end_experience_range = end ?? 0;

      return newCandidate;
    });
  }
}

export default CreateCandidatesService;
