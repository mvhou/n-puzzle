import fs from "fs";

const removeComments = (input) =>
  input.map((line) => line.split("#")[0]).filter((line) => line.length > 0);

export const getLines = (filePath) => {
  if (!fs.existsSync(filePath)) return null;
  return removeComments(fs.readFileSync(filePath).toString().split("\n"));
};

export const getSize = (input) => +input[0];

export const getPuzzle = (input) =>
  input.map((line) => line.trim().split(" ").map(Number));

export const validateInput = (input, size) =>
  input.length === size &&
  input.every(
    (line) =>
      line.length === size && line.every((c) => !isNaN(c) && isFinite(c))
  ) &&
  input
    .flat()
    .sort((a, b) => a - b)
    .every((num, i, arr) => i === arr.length - 1 || num === arr[i + 1] - 1);
