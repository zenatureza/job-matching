import getCityAndStateFromRecruitingApiCity from './getCityAndStateFromRecruitingApiCity';

describe('getCityAndStateFromRecruitingApiCity', () => {
  it('should returned city with state tuple', () => {
    const city = 'São Paulo';
    const state = 'SP';
    const candidateCity = `${city} - ${state}`;

    const cityAndState: [string, string] = getCityAndStateFromRecruitingApiCity(
      candidateCity,
    );

    expect(cityAndState[0]).toBe(city);
    expect(cityAndState[1]).toBe(state);
  });
});
