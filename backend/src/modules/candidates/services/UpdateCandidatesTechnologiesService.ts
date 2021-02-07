import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import { inject, injectable } from 'tsyringe';
import RecruitingApiCandidateDTO from '../dtos/RecruitingApiCandidateDTO';
import CandidateTechnology from '../infra/typeorm/entities/CandidateTechnology.entity';
import ICandidatesRepository from '../repositories/ICandidatesRepository';
import ICandidatesTechnologiesRepository from '../repositories/ICandidatesTechnologiesRepository';

@injectable()
class UpdateCandidatesTechnologiesService {
  constructor(
    @inject('CandidatesTechnologiesRepository')
    private readonly candidatesTechnologiesRepository: ICandidatesTechnologiesRepository,

    @inject('CandidatesRepository')
    private readonly candidatesRepository: ICandidatesRepository,

    @inject('TechnologiesRepository')
    private readonly technologiesRepository: ITechnologiesRepository,
  ) {}

  public async execute(
    recruitingApiCandidates: RecruitingApiCandidateDTO[],
  ): Promise<CandidateTechnology[] | undefined> {
    const existingCandidatesWithTechnologies = await this.candidatesRepository.findByIds(
      recruitingApiCandidates.map(candidate => candidate.id),
    );

    // candidates were created/updated already
    if (
      !existingCandidatesWithTechnologies ||
      existingCandidatesWithTechnologies.length <= 0
    )
      return;

    // TODO: techNames variable should be retreived via utils function
    let candidatesTechnologiesNames: string[] = [];
    recruitingApiCandidates.forEach(candidate => {
      candidate.technologies.forEach(tech => {
        candidatesTechnologiesNames.push(tech.name);
      });
    });

    const techNames = Array.from(new Set(candidatesTechnologiesNames));
    const technologies = await this.technologiesRepository.findByNames(
      techNames,
    );

    if (!technologies || technologies.length <= 0) return;

    let candidatesTechnologiesToSave: CandidateTechnology[] = [];

    recruitingApiCandidates.forEach(recruitingApiCandidate => {
      const candidateDb = existingCandidatesWithTechnologies.find(
        dbCandidate =>
          dbCandidate.recruiting_api_id === recruitingApiCandidate.id,
      ) as any;

      // updates already existing technologies states (is_main_tech)
      recruitingApiCandidate.technologies.forEach(recruitingApiTech => {
        const candidateTechDb = candidateDb.technologies?.find(
          (dbTech: any) => dbTech.technology.name === recruitingApiTech.name,
        );

        if (candidateTechDb) {
          candidateTechDb.is_main_tech = recruitingApiTech.is_main_tech;

          candidatesTechnologiesToSave.push(candidateTechDb);
        } else {
          const techData = technologies.find(
            tech => tech.name === recruitingApiTech.name,
          ) as any;

          const newCandidateTech = new CandidateTechnology(
            techData.id,
            recruitingApiCandidate.id,
            candidateDb.id,
          );

          newCandidateTech.is_main_tech = recruitingApiTech.is_main_tech;

          candidatesTechnologiesToSave.push(newCandidateTech);
        }
      });
    });

    return await this.candidatesTechnologiesRepository.save(
      candidatesTechnologiesToSave,
    );
  }
}

export default UpdateCandidatesTechnologiesService;
