import CreateCandidateDTO from '@modules/candidates/dtos/CreateCandidatoDTO';
import Candidate from '@modules/candidates/infra/typeorm/entities/Candidate.entity';
import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';
import { v4 as uuid_v4 } from 'uuid';
import ICandidatesRepository from '../ICandidatesRepository';

export default class CandidatesRepositoryMock implements ICandidatesRepository {
  private candidates: Candidate[] = [];

  public async save(candidates: Candidate[]): Promise<Candidate[] | undefined> {
    const createdCandidatesPromises = candidates.map(async candidate => {
      return await this.create({
        experience: candidate.getExperience(),
        city_id: candidate.city_id,
        recruiting_api_id: candidate.recruiting_api_id,
      });
    });

    const createdTechs = await Promise.all(createdCandidatesPromises);

    return createdTechs;
  }

  public async create({
    city_id,
    recruiting_api_id,
    experience,
  }: CreateCandidateDTO): Promise<Candidate> {
    const newCandidate = new Candidate(experience, city_id, recruiting_api_id);

    Object.assign(newCandidate, {
      id: uuid_v4(),
      city_id,
      recruiting_api_id,
      start_experience_range: newCandidate.start_experience_range,
      end_experience_range: newCandidate.end_experience_range,
    });

    this.candidates.push(newCandidate);

    return newCandidate;
  }

  public async findByIds(ids: number[]): Promise<Candidate[] | undefined> {
    return this.candidates.filter(candidate =>
      ids.includes(candidate.recruiting_api_id),
    );
  }

  public async findByFilters(
    city: string,
    experience: string,
    technologies: RecruitingApiCandidateTechnologyDTO[],
  ): Promise<Candidate[] | undefined> {
    throw new Error('Method not implemented.');
  }
}
