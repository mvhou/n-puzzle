import fs from "fs";
import { inversions } from "./heuristics.js";

const removeComments = (input) =>
  input.map((line) => line.split("#")[0]).filter((line) => line.length > 0);

export const getLines = (filePath) => {
  if (!fs.existsSync(filePath) || fs.lstatSync(filePath).isDirectory())
    return null;
  return removeComments(fs.readFileSync(filePath).toString().split("\n"));
};

export const getSize = (input) => +input[0];

export const getPuzzle = (size, input) => {
  const out = new Uint8Array(size * size);
  input
    .map((line) => line.trim().split(/\s+/).map(Number))
    .flat()
    .forEach((element, i) => {
      out[i] = element;
    });
  return out;
};

const isSolvable = (puzzle, solution) => {
  const size = Math.sqrt(puzzle.length);
  let i = inversions(puzzle, solution);
  let empty;

  for (let pos = 0; pos < puzzle.length; pos++) {
    if (puzzle[pos] === 0)
      empty =
        Math.floor(pos / size) +
        [0, 1][+(size % 2 === 0 && (size / 2) % 2 === 1)];
  }

  if (size % 2 === 1) return i % 2 === 0;
  return (i % 2 === 1 && empty % 2 == 1) || (i % 2 === 0 && empty % 2 == 0);
};

const boolWrapper = (bool, msg, error) => {
  if (!bool) error.error = msg;
  return bool;
};

export const validateInput = (input, size, solution, error) =>
  boolWrapper(input.length === size * size, "incorrect size", error) &&
  boolWrapper(
    input.every((c) => !isNaN(c) && isFinite(c)),
    "invalid characters",
    error
  ) &&
  boolWrapper(
    input.reduce((min, num) => (num < min ? num : min)) === 0,
    "numbers don't start at 0",
    error
  ) &&
  boolWrapper(
    input
      .slice()
      .sort((a, b) => a - b)
      .every((num, i, arr) => i === arr.length - 1 || num === arr[i + 1] - 1),
    "numbers aren't consecutive",
    error
  ) &&
  boolWrapper(isSolvable(input, solution), "not solvable", error);
