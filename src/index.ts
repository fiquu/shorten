/**
 * Shorten options.
 */
export interface ShortenOptions {
  /**
   * String to use as ellipsis.
   */
  ellipsis?: string;

  /**
   * Maximum string length.
   */
  length?: number;

  /**
   * Whether to keep whole words.
   */
  words?: boolean;

  /**
   * Whether to count ellipsis's length in the maximum length.
   */
  lax?: boolean;
}

/**
 * Shorten function signature.
 */
export interface ShortenFunction {
  (value: string, options?: ShortenOptions): string;
}

/**
 * Shortens (truncates) a string to a max length keeping whole words by
 * default.
 *
 * @param {string} value The string to shorten.
 * @param {ShortenOptions} options The options object.
 * @param {string} options.value The value to truncate.
 * @param {number} options.length The max chars to display. Defaults to `10`.
 * @param {string} options.ellipsis The ellipsis to show if string is truncated. Defaults to `...`.
 * @param {boolean} options.words Whether to trim on the last word or any character. Defaults to `true`.
 * @param {boolean} options.lax Whether to not include ellipsis' length in the maximum length. Defaults to `false`.
 *
 * @returns {string} The truncated string.
 */
function shorten(value: string, options: ShortenOptions = {}): string {
  const { length = 10, ellipsis = '...', words = true, lax = false } = {
    ...options
  };

  if (!value) {
    return '';
  }

  if (value.length <= length) {
    return value;
  }

  // Trim the string to the maximum length
  const pad: number = lax ? 0 : ellipsis.length;
  const trimmed: string = value.substr(0, length - pad);

  if (!words) {
    return `${trimmed}${ellipsis}`;
  }

  // Adjust if we are in the middle of a word
  const lastSpace: number = trimmed.lastIndexOf(' ');
  const index: number = Math.min(trimmed.length, lastSpace);
  const adjusted: string = trimmed.substr(0, index);

  return `${adjusted}${ellipsis}`;
}

export default shorten;
