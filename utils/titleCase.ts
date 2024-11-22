/**
 * Makes a sentence title case.
 * @param str - The input string.
 * @returns The formatted string.
 */
export default function (str: string): string {
  return str
    .toLowerCase()
    .split(/[\s_]/)
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
