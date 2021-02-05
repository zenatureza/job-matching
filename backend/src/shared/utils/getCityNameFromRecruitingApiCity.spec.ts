import getCityFromRecruitingApiCity from './getCityNameFromRecruitingApiCity';

describe('getCityFromRecruitingApiCity', () => {
  it('should get only city name from recruiting api city format', () => {
    const city = 'São Paulo';
    const recruitingApiCity = `${city} - SP`;

    const cityName = getCityFromRecruitingApiCity(recruitingApiCity);

    expect(cityName).toBe(city);
  });
});
