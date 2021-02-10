import GetTechnologiesService from '@modules/technologies/services/GetTechnologiesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TechnologiesController {
  public async get(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(GetTechnologiesService);

    const data = await service.execute();

    return response.json(
      data.map(tech => {
        return {
          label: tech.name,
          id: tech.id,
        };
      }),
    );
  }
}
