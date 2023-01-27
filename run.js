import { logger } from "./logger.js";
import { getLines, getSize, getPuzzle, validateInput } from "./input.js";
import { solve } from "./solver.js";
import { generateConsecutive, generateSnail } from "./solution.js";

export const run = (filePath, parameters
) => {
  const lines = getLines(filePath);

  if (!lines) return logger.Error("file not found", filePath);

  const size = getSize(lines);

  console.log(lines)

  if (!(size >= 1)) return logger.Error("invalid size", size);

  const puzzle = getPuzzle(size, lines.slice(1));

  logger.Print(puzzle, size)

  const snail = generateSnail(size)

  const consecutive = generateConsecutive(size)

  const solution = snail

  const error = {error: null}

  if (!validateInput(puzzle, size, solution, error)) {
    return logger.Error("invalid puzzle", error.error);
  }
  
  const s = solve(puzzle, solution)
  console.table(s.reverse().map(n => n.puzzle))
  return 0;
};
