export function normalizeStudentCode(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(
      /^((?:P6|S[1-5])[A-H])([1-9])$/,
      (_match, prefix: string, number: string) => `${prefix}0${number}`
    )
}
