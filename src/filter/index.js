export function date(value) {
  let date = new Date(value * 1);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
