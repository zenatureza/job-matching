// e.g. recruitingApiExperience: '4-5 years', '12+ years' returns [4, 5] and [12, null]
export default function (
  recruitingApiExperience: string,
): [number, number | null] {
  // TODO: should validate if given string contains 'years' word
  const rangeString = recruitingApiExperience.split(' years')[0];

  if (rangeString.includes('+')) {
    const start = parseInt(rangeString.split('+')[0]);

    return [start, null];
  } else if (rangeString.includes('-')) {
    const range = rangeString.split('-');

    return [parseInt(range[0]), parseInt(range[1])];
  }

  // 'experience' coming from api isnt valid
  return [0, null];
}
