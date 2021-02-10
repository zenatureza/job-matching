export interface Technology {
  is_main_tech: boolean;
  technology: string;
}

export interface Candidate {
  candidate_id: string;
  city: string;
  city_id: string;
  technologies: { [key: string]: Technology };
  experience: string;
}

export default interface IGetBestCandidatesResponse {
  candidates: Candidate[];
}
