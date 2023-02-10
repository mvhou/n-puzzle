import { inOrder, inversions, manhattan } from "./heuristics.js";
import { generateConsecutive, generateSnail } from "./solution.js";

const heuristics = (key) =>
  ({
    manhattan: manhattan,
    inorder: inOrder,
    inversions: inversions,
  }[key] || manhattan);

const order = (key) =>
  ({
    snail: generateSnail,
    consecutive: generateConsecutive,
  }[key] || generateSnail);

const greed = (key) => {
  if (isNaN(key)) return null
  return Math.max(Math.min(key, 10), 1)
}

export const parameters = (input) => {
  const pMap = new Map();
  pMap.set("o", generateSnail);
  pMap.set("h", manhattan);
  pMap.set("g", null)

  input
    .filter((e) => e.length > 1 && e[1] === "=" && pMap.has(e.split("=")[0]))
    .forEach((parameter) => {
      const p = parameter.split("=");
      const u = { o: order, h: heuristics, g:greed }[p[0]](p[1]);
      pMap.set(p[0], u);
    });
  return pMap;
};
