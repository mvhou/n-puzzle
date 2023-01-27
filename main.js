import { run } from "./run.js";
import { logger } from "./logger.js";
import { parameters } from "./parameters.js";

(() => {
  if (process.argv.length < 3) logger.Error("no input file");

  const files = process.argv.slice(2);
  const p = parameters(files)

  console.table(p)

  files.forEach((file) => {
    logger.Log(["pass", "fail"][run(file, p)], file.split("/").at(-1));
  });
})();
