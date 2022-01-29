/**
 * Shuffles (mutates!) an array (Fisher-Yates shuffle algorithm)
 * @param array The array to be shuffled
 */
const shuffleArray = (array: any[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

export default shuffleArray
