import { run } from "./run.js";
import { logger } from "./logger.js";
import { parameters } from "./parameters.js";

(() => {
  if (process.argv.length < 3) return logger.Error("no input file");

  const files = process.argv.slice(2).filter((f) => f[1] !== "=");
  if (files.length === 0) return logger.Error("no input file");
  const p = parameters(process.argv.slice(2));

  files.forEach((file) => {
    logger.Log(["pass", "fail"][run(file, p)], file.split("/").at(-1));
  });
})();
