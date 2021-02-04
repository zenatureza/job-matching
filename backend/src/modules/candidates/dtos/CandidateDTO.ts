import RecruitingApiCandidateTechnologyDTO from '@modules/technologies/dtos/RecruitingApiCandidateTechnologyDTO';

export default interface CandidateDTO {
  // e.g. '4-5 years', '12+ years'
  experience: string;

  // e.g. 'São Paulo - SP', 'Osasco - SP'
  city: string;
  technologies: RecruitingApiCandidateTechnologyDTO[];
}
