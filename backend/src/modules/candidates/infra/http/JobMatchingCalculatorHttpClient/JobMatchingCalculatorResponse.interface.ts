interface CandidateData {
  candidate_id: string;
  city_id: string;
  end_experience_range: number;
  start_experience_range: number;
  state_initials: string;
  technologies: { [key: string]: boolean };
}

export default interface JobMatchingCalculatorResponse {
  candidates: CandidateData[];
}
