/**
 *
 * @param string e.g. 'São Paulo - SP' returns 'São Paulo'
 */
export default function (recruitingApiCity: string) {
  return recruitingApiCity.split(' - ')[0];
}
