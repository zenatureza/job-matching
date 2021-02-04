import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';

export default interface RecruitingApiJobDTO {
  id: number;
  city: string;
  technologies: RecruitingApiCandidateTechnologyDTO[];
  experience: string;
}
