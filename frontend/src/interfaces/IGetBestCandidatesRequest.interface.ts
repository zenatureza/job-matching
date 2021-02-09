export default interface IGetBestCandidatesRequest {
  cityId: string;
  startExperienceRange: number;
  endExperienceRange: number;
  technologiesIds: string[];
}
