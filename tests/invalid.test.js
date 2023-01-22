import fs from "fs";
import { run } from "../run.js";

const path = "./puzzles/invalid/";

const puzzles = fs.readdirSync(path);

puzzles.forEach((puzzle) =>
  test(puzzle, () => expect(run(path + puzzle)).toBe(1))
);
