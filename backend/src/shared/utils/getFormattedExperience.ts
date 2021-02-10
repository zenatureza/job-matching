export default function (
  start_experience_range: number,
  end_experience_range: number,
) {
  const end =
    (end_experience_range ? '-' + end_experience_range : '+') + ' anos';

  const result = `${start_experience_range}${end}`;

  return result;
}
