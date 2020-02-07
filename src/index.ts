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
 * Shortens (truncates) a string to a max length keeping whole words by
 * default.
 *
 * @param {string} value The string to shorten.
 * @param {ShortenOptions} options The options object.
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
