/**
 * Generates first <limit> Narcissistic Numbers
 *
 * @param {number} limit - Number of Narcissistic Numbers to be generated
 * @returns {object} narcissisticNumbers -  Array of <limit> Narcissistic Numbers
 */
const generateNarcissisticNumbers = (limit) => {
  const narcissisticNumbers = []

  for (let number = 0; narcissisticNumbers.length < limit; number++) {
    const stringNumber = String(number)
    let sum = 0

    for (const digit of stringNumber) {
      sum += Math.pow(Number(digit), stringNumber.length)
    }

    sum === number && narcissisticNumbers.push(number)
  }

  return narcissisticNumbers
}

/**
 * Return an array for the indices of the characters in the uppercase string
 * e.g. Returns [0, 1, 2] for 'ABC'
 *
 * @param {string} str - String to be converted to index array
 * @returns {object} resultArray - Array containing indices of string characters
 */
const alphabetsToIndex = (str) => {
  const resultArray = []

  for (const character in str) {
    const code = str.charCodeAt(character)
    if (code > 64 && code < 91) resultArray.push(code - 65)
  }

  return resultArray
}

/**
 * Return an uppercase string formed from the array for the indices of the characters
 * e.g. Returns 'ABC' for [0, 1, 2]
 *
 * @param {object} stringArray - String to be converted to index array
 * @returns {string} - String formed by the indices of the characters
 */
const indexToAlphabet = (stringArray) => {
  for (const index in stringArray) {
    stringArray[index] = stringArray[index] + 65
  }

  return String.fromCharCode(...stringArray)
}

/**
 * Transforms the <numberString> to a string in the following way:
 * i] Break the string into the numbers <= 25
 * ii] Replace the number with the character on that index
 * E.g "256152" = [25], [6], [15], [2] = Z G P C = "ZGPC"
 *
 * @param {string} numberString - String to be transformed
 * @returns {string}
 */
const transformString = (numberString) => {
  const limit = 25
  const transformedString = []
  let buffer = ''
  for (let index = 0; index < numberString.length; index++) {
    if (Number(buffer + numberString[index]) <= limit) {
      buffer += numberString[index]
      continue
    } else {
      transformedString.push(Number(buffer))
      buffer = numberString[index]
    }
  }

  // push remaining buffer into string
  transformedString.push(Number(buffer))

  return indexToAlphabet(transformedString)
}

/**
 * Encrypts the string
 * Refer the readme file for more details
 *
 * @param {String} str - String to encrypt
 * @param key - Key used while encryption
 * @returns {string}
 */
const encryptString = (str, key = 0) => { /* eslint-disable-line no-unused-vars */
  const allowedString = new RegExp('^[A-Z]{1,100}$')

  if (!allowedString.test(str)) {
    throw new Error('String needs to only have UPPERCASE characters!')
  }

  const positionArray = alphabetsToIndex(str)

  for (const index in positionArray) {
    positionArray[index] += key
  }

  const maxIndex = Math.max(...positionArray)
  const NNArray = generateNarcissisticNumbers(maxIndex)

  positionArray.forEach((character, index) => {
    positionArray[index] = NNArray[character - 1]
  })

  const positionString = positionArray.join('')

  return transformString(positionString)
}
