import getExperience from './getFormattedExperience';

describe('getExperience', () => {
  it('should return formatted experience without + sign', () => {
    const [startExperienceRange, endExperienceRange] = [4, 5];

    const formattedExperience = getExperience(
      startExperienceRange,
      endExperienceRange,
    );

    expect(formattedExperience).toBe(
      `${startExperienceRange}-${endExperienceRange} anos`,
    );
  });

  it('should return formatted experience with + sign', () => {
    const [startExperienceRange, endExperienceRange] = [4, 0];

    const formattedExperience = getExperience(
      startExperienceRange,
      endExperienceRange,
    );

    expect(formattedExperience).toBe(`${startExperienceRange}+ anos`);
  });
});
