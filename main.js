import { run } from "./run.js";
import { logger } from "./logger.js";

(() => {
  if (process.argv.length < 3) logger.Error("no input file");

  const files = process.argv.slice(2);

  files.forEach(file => {
    logger.Log(["pass", "fail"][run(file)], file.split('/').at(-1))
  });
})();
