export default function (cityName: string, stateInitials: string) {
  // if remote this.state is null
  if (!stateInitials) {
    return cityName.toUpperCase();
  }

  return `${cityName} - ${stateInitials}`.toUpperCase();
}
