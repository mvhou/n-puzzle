import fs from "fs";
import { manhattan } from "../heuristics.js";
import { run } from "../run.js";
import { generateSnail } from "../solution.js";

const path = "./puzzles/valid/";

const puzzles = fs.readdirSync(path);

const parameters = new Map();

parameters.set("o", generateSnail);
parameters.set("h", manhattan);

console.table(puzzles);

puzzles.forEach((puzzle, i) => {
  console.table({ puzzle, i });
  test(puzzle, () => expect(run(path + puzzle, parameters)).toBe(0));
});
