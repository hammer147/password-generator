/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param min 
 * @param max 
 */
 const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default getRandomInt
