import fs from "fs";
import { run } from "../run.js";
import { generateSnail } from "../solution.js";
import { manhattan } from "../heuristics.js";

const path = "./puzzles/invalid/";

const puzzles = fs.readdirSync(path);

const parameters = new Map();

parameters.set("o", generateSnail);
parameters.set("h", manhattan);

console.table(puzzles.length);

puzzles.forEach((puzzle) => {
  test(puzzle, () => expect(run(path + puzzle, parameters)).toBe(1));
});
