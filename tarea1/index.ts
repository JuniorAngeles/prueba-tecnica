function reverseArrayWithSpecialChars<T extends string | number>(arr: T[]): T[] {
  const isSpecialChar = (char: T): boolean => {
    return typeof char !== 'number' && !/[a-zA-Z]/.test(char);
  };

  const specialChars = arr.map((char, index) => (isSpecialChar(char) ? { char, index } : null)).filter(Boolean);

  const nonSpecialChars = arr.filter((char) => !isSpecialChar(char));

  const invertedNonSpecialChars = nonSpecialChars.reverse();

  specialChars.forEach((item) => {
    if (item !== null) {
      const { char, index } = item;
      invertedNonSpecialChars.splice(index, 0, char);
    }
  });

  return invertedNonSpecialChars;
}

const inputArray = ['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8];
const result = reverseArrayWithSpecialChars(inputArray);
console.log(result);
