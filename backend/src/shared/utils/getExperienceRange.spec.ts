import getExperienceRange from './getExperienceRange';

describe('getExperienceRange', () => {
  it('should return experience as a valid tuple', () => {
    const startStr = '4';
    const endStr = '5';

    const recruitingApiExperience = `${startStr}-${endStr} years`;

    const [start, end] = getExperienceRange(recruitingApiExperience);

    expect(start.toString()).toBe(startStr);
    expect(end?.toString()).toBe(endStr);
  });

  it('should return invalid tuple when experience range is invalid', () => {
    const startStr = '4';

    const recruitingApiExperience = `${startStr} years`;

    const [start, end] = getExperienceRange(recruitingApiExperience);

    expect(start.toString()).not.toBe(startStr);
    expect(start).toBe(0);
    expect(end).toBe(0);
  });

  it('should return invalid tuple when years word isnt provided', () => {
    const startStr = '4';

    const recruitingApiExperience = `${startStr}`;

    const [start, end] = getExperienceRange(recruitingApiExperience);

    expect(start).toBe(0);
    expect(end).toBe(0);
  });
});
