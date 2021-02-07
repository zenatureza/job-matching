import getCityWithState from './getCityWithState';

describe('getCityWithState', () => {
  it('should get with state', () => {
    const cityName = 'Rio de Janeiro';
    const stateInitials = 'RJ';

    const result = getCityWithState(cityName, stateInitials);

    expect(result).toContain(cityName.toUpperCase());
    expect(result).toContain(stateInitials.toUpperCase());
  });

  it('should get only city name', () => {
    const cityName = 'Remote';
    // const stateInitials = 'RJ';

    const result = getCityWithState(cityName, '');

    expect(result).toContain(cityName.toUpperCase());
    expect(result).not.toContain('-');
  });
});
