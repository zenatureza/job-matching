import City from '@modules/cities/infra/typeorm/entities/City.entity';
import { inject, injectable } from 'tsyringe';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import Candidate from '../infra/typeorm/entities/Candidate.entity';
import ICandidatesRepository from '../repositories/ICandidatesRepository';

@injectable()
class UpdateCandidatesService {
  constructor(
    @inject('CandidatesRepository')
    private readonly candidatesRepository: ICandidatesRepository,
  ) {}

  public async execute(
    alreadyExistingCandidatesDTO: RecruitingApiCandidateDTO[],
    existingCandidates: Candidate[],
    candidatesCities: City[],
  ): Promise<Candidate[]> {
    alreadyExistingCandidatesDTO.forEach(recruitingApiCandidateData => {
      const dbCandidate = existingCandidates.find(
        current => current.recruiting_api_id === recruitingApiCandidateData.id,
      );

      if (!dbCandidate) return;

      dbCandidate.setExperienceRange(recruitingApiCandidateData.experience);

      // should update candidates city if its different
      if (
        dbCandidate.city.getCityWithState() !==
        recruitingApiCandidateData.city.toUpperCase()
      ) {
        const newCity = candidatesCities.find(
          city =>
            city.getCityWithState() ===
            recruitingApiCandidateData.city.toUpperCase(),
        );

        if (newCity) {
          dbCandidate.city_id = newCity.id;
        }
      }
    });

    return await this.candidatesRepository.save(existingCandidates);
  }
}

export default UpdateCandidatesService;
