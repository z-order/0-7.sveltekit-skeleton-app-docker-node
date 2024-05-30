/**
 * @file utils-zstring.ts
 * @description String utilities for manipulation, validation, etc...
 * @version 1.0.0 on Dec 5, 2023 (v20231205), Initial version
 */

class zString {
  public static __CLASSNAME__ = 'zString';

  /**
   * @description Checks if the ID is valid format
   *              1) The length of ID should be between 4 and 32.
   *              2) Should consist of letters, numbers and underscores (_).
   *              3) The first character must be start with letters.
   *              4) Avoid using spaces or other special characters.
   * @examples
   *
   * // Example usage:
   * console.log(zString.isValidIDFormat("valID123"));           // true (8 characters)
   * console.log(zString.isValidIDFormat("sh"));                 // false (too short)
   * console.log(zString.isValidIDFormat("a".repeat(33)));       // false (too long)
   * console.log(zString.isValidIDFormat("Valid_ID_2023"));      // true
   * console.log(zString.isValidIDFormat("validID_123"));        // true
   * console.log(zString.isValidIDFormat("1InvalidID"));         // false
   * console.log(zString.isValidIDFormat("_invalidID", 4, 32));  // false
   * console.log(zString.isValidIDFormat("invalid ID", 4, 32));  // false
   * console.log(zString.isValidIDFormat("ValidID", 4, 32));     // true
   *
   * @param {string} paramId - The ID to be validated.
   * @param {number} [minCharacters=4] - Minimum number of characters for the ID.
   * @param {number} [maxCharacters=32] - Maximum number of characters for the ID.
   * @returns {boolean} Returns true if the ID is valid format, otherwise false.
   */
  public static isValidIDFormat(paramId: string, minCharacters = 4, maxCharacters = 32): boolean {
    const __FUNCTION__ = 'isValidIDFormat()';
    const __CLASSNAME__ = this.__CLASSNAME__;

    // Ensure minCharacters is not greater than maxCharacters
    if (minCharacters > maxCharacters) {
      throw new Error(`${__CLASSNAME__}::${__FUNCTION__} Minimum characters cannot be greater than maximum characters`);
    }
    // Regular expression to validate the ID
    // ^ asserts position at start of the string
    // [a-zA-Z] ensures the first character is a letter
    // [a-zA-Z0-9_] allows for any combination of letters, numbers, and underscores
    // * indicates zero or more occurrences of the preceding element
    // {3,31} indicates the length of the string should be between 4 and 32
    // {minCharacters-1,maxCharacters-1} for the specified range of characters, making the total length within minCharacters to maxCharacters
    // $ asserts position at the end of the string
    //
    // ex) const regex = /^[a-zA-Z][a-zA-Z0-9_]{3,31}$/;
    //
    const regex = new RegExp(`^[a-zA-Z][a-zA-Z0-9_]{${minCharacters - 1},${maxCharacters - 1}}$`);

    // Test the param against the regex
    return regex.test(paramId);
  }

  /**
   * @description Checks if the name is valid format including UTF-8 or UTF-16 global characters
   *              1) The length of ID should be between 4 and 32.
   *              2) Should consist of letters, numbers and underscores (_).
   *              3) The first character must be start with letters.
   *              4) Avoid using spaces or other special characters.
   * @examples
   *
   * // Example usage:
   * console.log(zString.isValidNameFormat("valID123"));           // true (8 characters)
   * console.log(zString.isValidNameFormat("sh"));                 // false (too short)
   * console.log(zString.isValidNameFormat("a".repeat(33)));       // false (too long)
   * console.log(zString.isValidNameFormat("Valid_ID_2023"));      // true
   * console.log(zString.isValidNameFormat("有效ID123"));           // true (Chinese characters)
   * console.log(zString.isValidNameFormat("おはよう"));             // true (Japanese characters)
   * console.log(zString.isValidNameFormat("नमस्कारी"));              // true (Hindi characters)
   * console.log(zString.isValidNameFormat("حاسوب"));              // true (Arabic characters)
   * console.log(zString.isValidNameFormat("คอมพิวเตอร์"));          // true (Thai characters)
   * console.log(zString.isValidNameFormat("Máyvitính"));          // true (Vientamese characters)
   * console.log(zString.isValidNameFormat("컴퓨터공학"));            // true (Korean characters)
   * console.log(zString.isValidNameFormat("1InvalidID", 4, 32));  // false (starts with a number)
   * console.log(zString.isValidNameFormat("_invalidID", 4, 32));  // false (starts with an underscore)
   * console.log(zString.isValidNameFormat("Valid_ID", 4, 32));    // true
   *
   * @param {string} paramId - The ID to be validated.
   * @param {number} [minCharacters=4] - Minimum number of characters for the ID.
   * @param {number} [maxCharacters=32] - Maximum number of characters for the ID.
   * @returns {boolean} Returns true if the ID is valid format, otherwise false.
   */
  public static isValidNameFormat(paramId: string, minCharacters = 4, maxCharacters = 32): boolean {
    const __FUNCTION__ = 'isValidNameFormat()';
    const __CLASSNAME__ = this.__CLASSNAME__;

    // Ensure minCharacters is not greater than maxCharacters
    if (minCharacters > maxCharacters) {
      throw new Error(`${__CLASSNAME__}::${__FUNCTION__} Minimum characters cannot be greater than maximum characters`);
    }
    // Regular expression to validate the ID with UTF-8 and UTF-16 characters
    // ^ asserts position at start of the string
    // \p{L} matches any kind of letter from any language
    // [0-9_] allows for numbers and underscores
    // * indicates zero or more occurrences of the preceding element
    // {3,31} indicates the length of the string should be between 4 and 32
    // {minCharacters-1,maxCharacters-1} for the specified range of characters, making the total length within minCharacters to maxCharacters
    // $ asserts position at the end of the string
    // 'u' flag enables Unicode (UTF-16 in JavaScript) support
    //
    // ex) const regex = /^\p{L}[\p{L}0-9_]{3,31}$/u;
    //
    // For specific languages, use the following regex:
    // '\u0041-\u005A\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02AF' for Latin characters
    // '\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF' for Greek characters
    // '\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD' for Cyrillic characters
    // '\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF' for Korean characters
    //
    // For all languages, it's standard to use the following regex:
    const regex = new RegExp(`^\\p{L}[\\p{L}0-9_]{${minCharacters - 1},${maxCharacters - 1}}$`, 'u');
    // For special languages: Latin, Greek, Cyrillic, Armenian, Hebrew, Arabic, Syriac, Thaana, Devanagari, and many other scripts.
    const regexSpecialLanguages = new RegExp(
      `^[
          \u0041-\u005A\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02AF
          \u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF
          \u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD
          \u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF
        ][
          \u0041-\u005A\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02AF
          \u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF
          \u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD
          \u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF0-9_
        ]{${minCharacters - 1},${maxCharacters - 1}}$`,
      'u',
    );

    // Test the param against the regex
    return regex.test(paramId) || regexSpecialLanguages.test(paramId);
  }
} // end zString

export { zString };
export default zString;
