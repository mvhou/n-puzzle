export const removeComments = (input) => input.map(line => line.split('#')[0])
                                              .filter(line => line.length > 0)

export const getSize = (input) => +input[0]

export const getPuzzle = (input) => input.map(line => line.trim()
                                                          .split(' ')
                                                          .map(Number))

export const validateInput = (input, size) => {
  if (input.length != size)
    return false
  if (!input.every(line => line.length === size && [...line].every(c => !isNaN(c) && isFinite(c))))
    return false
  //todo: check if pieces are valid sequence of numbers
  if (!input.flat().every((num, i, arr) => i === arr.length - 1 || num < arr[i + 1]))
    return false
  return true
}
