import { PasswordState } from '../../global-state/password'
import getRandomInt from '../../utils/get-random-int'
import shuffleArray from '../../utils/shuffle-array'

/**
 * unicode values: https://en.wikipedia.org/wiki/List_of_Unicode_characters
 * 
 * uppercase: 65 - 90
 * lowercase: 97 - 122
 * symbols: 33 - 47 and 58 - 64 and 91 - 96 and 123 - 126
 * numbers: 48 - 57 
 * 
 */

 /**
  * Returns the generated password and a description of its strength.
  * @param password A state object with the parameters used to generate the password.
  */
const useGeneratePassword = (password: PasswordState): [string, string] => {
  

  let allAllowedCharCodes: number[] = []

  // we want at least one char from each selected subset
  let oneRandomUppercase: number | undefined
  let oneRandomLowercase: number | undefined
  let oneRandomSymbol: number | undefined
  let oneRandomNumber: number | undefined

  if (password.uppercase) {
    // 26
    for (let i = 65; i < 91; i++) {
      allAllowedCharCodes.push(i)
    }
    oneRandomUppercase = getRandomInt(65, 90)
  }

  if (password.lowercase) {
    // 26
    for (let i = 97; i < 123; i++) {
      allAllowedCharCodes.push(i)
    }
    oneRandomLowercase = getRandomInt(97, 122)
  }

  if (password.symbols) {
    let symbolsArray: number[] = []
    // 15
    for (let i = 33; i < 48; i++) {
      allAllowedCharCodes.push(i)
      symbolsArray.push(i)
    }
    // 7
    for (let i = 58; i < 65; i++) {
      allAllowedCharCodes.push(i)
      symbolsArray.push(i)
    }
    // 6
    for (let i = 91; i < 97; i++) {
      allAllowedCharCodes.push(i)
      symbolsArray.push(i)
    }
    // 4
    for (let i = 123; i < 127; i++) {
      allAllowedCharCodes.push(i)
      symbolsArray.push(i)
    }

    let index = getRandomInt(0, symbolsArray.length - 1)
    oneRandomSymbol = symbolsArray[index]
  }

  if (password.numbers) {
    // 10
    for (let i = 48; i < 58; i++) {
      allAllowedCharCodes.push(i)
    }
    oneRandomNumber = getRandomInt(48, 57)
  }

  let randomlySelectedCharCodes: number[] = []

  if (oneRandomUppercase) randomlySelectedCharCodes.push(oneRandomUppercase)
  if (oneRandomLowercase) randomlySelectedCharCodes.push(oneRandomLowercase)
  if (oneRandomSymbol) randomlySelectedCharCodes.push(oneRandomSymbol)
  if (oneRandomNumber) randomlySelectedCharCodes.push(oneRandomNumber)

  let alreadySelected = randomlySelectedCharCodes.length

  for (let i = 0; i < password.length - alreadySelected; i++) {
    const index = getRandomInt(0, allAllowedCharCodes.length - 1)
    randomlySelectedCharCodes.push(allAllowedCharCodes[index])
  }

  // shuffle the array
  shuffleArray(randomlySelectedCharCodes)

  const generatedPassword = String.fromCharCode(...randomlySelectedCharCodes)

  // simplified formula to measure strength: strength = charCodes ** length
  // all charCodes: 26 + 26 + 15 + 7 + 6 + 10 = 90
  // weak < 90 ** 6
  // 90 ** 6 <= moderate < 90 ** 8
  // 90 ** 8 <=strong
  const strength = allAllowedCharCodes.length ** password.length

  let strengthDescription = ''
  if (strength < 90 ** 6) { strengthDescription = 'Weak' } else
    if (90 ** 6 <= strength && strength < 90 ** 8) { strengthDescription = 'Moderate' } else
      if (90 ** 8 <= strength) strengthDescription = 'Strong'

  return [generatedPassword, strengthDescription]
}

export default useGeneratePassword

/**
 * What we actually do is:
 *
 * 1) Choose one character from each selected subset (one uppercase, one lowercase etc.)
 * 2) Add the remaining characters from the entire set.
 * 3) Shuffle the result
 * 4) Create the string
 * 
 * 5) Measure the strength with a simplified formula
 * 
 * Possible improvement in 5): 
 * Measure the strength by calculating the exact number of possible outcomes
 * (this would be much more complex formula)
 * The result could also be displayed to the user as cool extra info...
 *
 */