export interface ShortenOptions {
  /**
   * Maximum string length.
   */
  length?: number;

  /**
   * String to use as ellipsis.
   */
  ellipsis?: string;

  /**
   * Whether to keep whole words.
   */
  words?: boolean;

  /**
   * Whether to count ellipsis' length in the maximum length.
   */
  lax?: boolean;
}

/**
 * Shorten default options.
 */
const defaults: ShortenOptions = Object.freeze<ShortenOptions>({
  ellipsis: '...',
  words: true,
  length: 50,
  lax: false
});

/**
 * Trims a string to the provided length.
 *
 * @param {string} value The value to trim.
 * @param {number} length The maximum string length.
 * @param {string} ellipsis The ellipsis string to use.
 * @param {boolean} lax Whether to not include ellipsis length on the maximum length.
 *
 * @returns {string} The trimmed string.
 */
const trimToLength = (
  value: string,
  length: number,
  ellipsis: string,
  lax: boolean
): string => {
  const pad: number = lax ? 0 : ellipsis.length;

  return value.substr(0, length - pad);
};

/**
 * Trims a string to words.
 *
 * @param {string} value The value to trim.
 * @param {string} ellipsis The ellipsis string to use.
 *
 * @returns {string} The trimmed string.
 */
const trimToWords = (value: string, ellipsis: string): string => {
  const lastSpace: number = value.lastIndexOf(' ');
  const index: number = Math.min(value.length, lastSpace);
  const adjusted: string = value.substr(0, index);

  return `${adjusted}${ellipsis}`;
};

/**
 * Shortens (truncates) a string to a max length keeping whole words by default.
 *
 * @param {string} value The string to shorten.
 * @param {object} options The options object.
 * @param {number} options.length Maximum length to return. Defaults to `50`.
 * @param {string} options.ellipsis Ellipsis string to use. Defaults to `'...'`.
 * @param {boolean} options.words Whether to keep words. Defaults to `true`.
 * @param {boolean} options.lax Whether to not include the ellipsis length in the maximum length. Defaults to `false`.
 *
 * @example
 * // Returns 'The...'
 * shorten('The strnig is logn and full of erorrs.');
 * @example
 * // Returns 'The strnig is...'
 * shorten('The strnig is logn and full of erorrs.', { length: 20 });
 *
 * @returns {string} The shortened (truncated) string.
 */
const shorten = (value: string, options?: ShortenOptions): string => {
  const { length, ellipsis, words, lax }: ShortenOptions = {
    ...defaults,
    ...options
  };

  if (!value) {
    return '';
  }

  if (value.length <= length) {
    return value;
  }

  const trimmed: string = trimToLength(value, length, ellipsis, lax);

  if (words) {
    return trimToWords(trimmed, ellipsis);
  }

  return `${trimmed}${ellipsis}`;
};

export default shorten;
