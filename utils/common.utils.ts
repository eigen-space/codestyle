export function getFirstWordFromCamelCase(str: string): string {
    const afterFirstUpperCaseLetterPattern = /([A-Z]).*/;
    return str.replace(afterFirstUpperCaseLetterPattern, '');
}