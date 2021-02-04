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

  // TODO: should throw an apperror when experience string format is invalid
});
