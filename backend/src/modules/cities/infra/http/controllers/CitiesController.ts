import GetCityByFilterService from '@modules/cities/services/GetCityByFilterService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CitiesController {
  // TODO: should return all available techs
  public async get(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query;
    if (!filter) {
      throw new AppError('Invalid filter', 400);
    }

    const service = container.resolve(GetCityByFilterService);

    const data = await service.execute(filter as string);

    return response.json(
      data
        .map(city => {
          return {
            label: city.getCityWithState(),
            id: city.id,
          };
        })
        .slice(0, 5),
    );
  }
}
