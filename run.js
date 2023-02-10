import { logger } from "./logger.js";
import { getLines, getSize, getPuzzle, validateInput } from "./input.js";
import { solve } from "./solver.js";

export const run = (filePath, parameters) => {
  const lines = getLines(filePath);
  if (!lines) return logger.Error("file not found", filePath);

  const size = getSize(lines);
  if (!(size >= 1)) return logger.Error("invalid size", size);

  const puzzle = getPuzzle(size, lines.slice(1));

  const solution = parameters.get("o")(size);

  const error = { error: null };

  if (!validateInput(puzzle, size, solution, error)) {
    return logger.Error("invalid puzzle", error.error);
  }

  const s = solve(puzzle, solution, parameters.get("h"), parameters.get("g"));
  s.path
    .reverse()
    .map((p) => p.puzzle)
    .forEach((pz) => logger.Print(pz, size));
  console.table(s.complexity);
  return 0;
};
