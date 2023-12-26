export const numberToRomanNumeral = (n: number): string => {
  if (typeof n !== 'number' || !isFinite(n)) {
    throw new Error('Invalid parameter, expected number');
  }
  const roman = [
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'IIX',
    'IX',
    'X',
    'XI',
    'XII',
  ];
  if (n < 1 || n > roman.length - 1) {
    throw new Error('Out of range value');
  }
  return roman[n];
};
