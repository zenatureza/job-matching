export interface Technology {
  is_main_tech: boolean;
  technology: string;
}

// export interface Technologies {
//   technology: { [key: string]: Technology };
// }

export interface Candidate {
  candidate_id: string;
  city: string;
  city_id: string;
  technologies: { [key: string]: Technology };
}

// TODO: scriar campo experience (4-5 anos)
export default interface IGetBestCandidatesResponse {
  candidates: Candidate[];
}
