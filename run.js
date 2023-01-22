import { logger } from "./logger.js"; 
import { getLines, getSize, getPuzzle, validateInput } from "./input.js";

export const run = (filePath) => {
  const lines = getLines(filePath);

  if (!lines) return logger.Error("file not found", filePath);

  const size = getSize(lines);

  if (!(size >= 1)) return logger.Error("invalid size", size);

  const puzzle = getPuzzle(lines.slice(1));

  if (!validateInput(puzzle, size))
    return logger.Error("invalid puzzle", puzzle);
  return 0;
};
