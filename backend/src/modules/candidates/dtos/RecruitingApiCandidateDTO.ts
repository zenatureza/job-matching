import RecruitingApiCandidateTechnologyDTO from '../../technologies/dtos/RecruitingApiCandidateTechnologyDTO';

export default interface RecruitingApiCandidateDTO {
  id: number;
  city: string;
  experience: string;
  technologies: RecruitingApiCandidateTechnologyDTO[];
}
