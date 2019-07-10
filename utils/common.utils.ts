export const END_OF_LINE_PATTERN = /\r\n?|\n/;

export function getFirstWordFromCamelCase(str: string) {
    const afterFirstUpperCaseLetterPattern = /([A-Z]).*/;
    return str.replace(afterFirstUpperCaseLetterPattern, '');
}
