import RecruitingApiCandidateDTO from '@modules/candidates/dtos/RecruitingApiCandidateDTO';
import RecruitingApiJobDTO from '@modules/jobs/dtos/RecruitingApiJobDTO';

export default interface RecruitingApiResponse {
  candidates: RecruitingApiCandidateDTO[];
  jobs: RecruitingApiJobDTO[];
}
