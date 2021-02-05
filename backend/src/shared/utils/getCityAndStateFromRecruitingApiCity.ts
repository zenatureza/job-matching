export default function (recruitingApiCity: string): [string, string] {
  const cityAndState = recruitingApiCity.split(' - ');

  return [cityAndState[0], cityAndState[1]];
}
