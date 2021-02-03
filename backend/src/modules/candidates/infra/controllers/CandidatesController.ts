import { Request, Response } from 'express';
// import { container } from 'tsyringe';

export default class CandidatesController {
  public async get(request: Request, response: Response): Promise<Response> {
    return response.json({
      test: 'Árthur',
    });
  }
}
