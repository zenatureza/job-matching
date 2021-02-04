import CandidatesRepositoryMock from '../repositories/mocks/CandidatesRepositoryMock';
import UpdateCandidatesService from './UpdateCandidatesService';

let candidatesRepositoryMock: CandidatesRepositoryMock;
let updateCandidatesService: UpdateCandidatesService;

describe('UpdateCandidatesService', () => {
  beforeEach(() => {
    candidatesRepositoryMock = new CandidatesRepositoryMock();

    updateCandidatesService = new UpdateCandidatesService(
      candidatesRepositoryMock,
    );
  });

  it('should update candidate city', async () => {
    //  await updateCandidatesService.execute();
  });
});
