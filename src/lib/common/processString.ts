/* Cut long texts */
export const limitedText = (text: string, length: number): string =>
  text.slice(0, length) + (text.length > length ? '…' : '');

/* Check empty text */
export const isTextEmpty = (text: string): boolean =>
  !(typeof text === 'string' && text !== '');

/* Check empty strings */
export const isStringsEmpty = (strings: string[]): boolean =>
  !(strings && strings.length !== 0 && strings[0] !== '');
