import { getPuzzle, getSize, validateInput, removeComments } from "./input.js"
import { logger } from "./logging.js"
import { getLines } from "./read.js"

(_main_ => {
  if (process.argv.length < 3)
    logger.Error("no input file")

  const filePath = process.argv[2]
  const input = removeComments(getLines(filePath))
  
  if (!input)
    return logger.Error("file not found", filePath)
  
  const size = getSize(input)
  
  if (!(size >= 1))
    return logger.Error("invalid size", size)
  
  const puzzle = getPuzzle(input.slice(1))
  
  if (!validateInput(puzzle, size))
    return logger.Error("invalid puzzle", puzzle)

  logger.Log("input validated")
})()