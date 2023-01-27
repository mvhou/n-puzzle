import { Heap } from "heap-js";
import { combine, inOrder, inversions, manhattan } from "./heuristics.js";
import { logger } from "./logger.js";

const empty = (puzzle) => {
  console.table(puzzle)
  for (let i = 0; i < puzzle.length; i++) {
    if (puzzle[i] === 0) return i
  }
};

const state = (puzzle, cfg) => {
  const e = empty(puzzle);
  const h = combine(puzzle, cfg)
  return {
    parent: null,
    empty: e,
    puzzle: puzzle,
    adjacent: null,
    h: h,
    g: 0,
  };
};

export const getPiece = (puzzle, position) => puzzle[position.y][position.x];

const newState = (state, newPos, cfg) => {
  const p = structuredClone(state.puzzle)
  p[state.empty] = state.puzzle[newPos];
  p[newPos] = 0;
  return {
    parent: state,
    empty: newPos,
    puzzle: p,
    adjacent: null,
    h: combine(p, cfg),
    g: state.g + cfg.g
  }
};

const getAdjacent = (state, cfg) => {
  const adjacent = [];
  const p = state.empty;
  const x = p % cfg.size
  const y = Math.floor(p / cfg.size)
  if (x > 0) adjacent.push(p - 1);
  if (y > 0) adjacent.push(p - cfg.size);
  if (x < cfg.size - 1) adjacent.push(p+1);
  if (y < cfg.size - 1) adjacent.push(p+cfg.size);
  const out = adjacent.map((a) => newState(state, a, cfg));
  state.adjacent = out
  return out
};

const gRate = (size) => ({1:10, 2:10, 3: 10, 4: 4})[size] || 2

const comparator = (a, b) => (a.h + a.g) - (b.h + b.g)

export const solve = (puzzle, solution, heuristics) => {
  const cfg = {
    size: Math.sqrt(puzzle.length),
    g: gRate(Math.sqrt(puzzle.length)),
    solution: solution.solution,
    lookup: solution.lookup,
    heuristics: [manhattan],
  }
  const initialState = state(puzzle, cfg);
  const open = new Heap(comparator)
  const closed = new Set()
  open.push(...getAdjacent(initialState, cfg))
  closed.add(JSON.stringify(initialState.puzzle))

  let i = 0;
  let end = null

  if (initialState.h === 0)
    return [initialState]

  // console.log(inOrder(puzzle, cfg))
  // return
  while (open.heapArray.length > 0) {
    const next = open.pop()
    if (next.h === 0) {
      console.table(next)
      end = next
      break
    }
    if (i++ % 50000 === 0) {
      console.table({
        puzzle:next.puzzle,
        g: next.g,
        h: next.h
      })
      console.log(closed.size)
    }
    const a = getAdjacent(next, cfg).filter(n => !closed.has(JSON.stringify(n.puzzle)))
    open.push(...a)
    closed.add(JSON.stringify(next.puzzle))
  }
  console.log(closed.size)  // logger.Print(end, cfg.size)
  if (end === null)
   return null
  const path = []
  while (end.parent !== null) {
    path.push(end)
    end = end.parent
  }
  return path
};


// const newSolver = (
//   puzzle,
//   solution=generateSnail(puzzle),
//   heuristics=[manhattan,inOrder],
//   ) => {

//     const open = 

//     return 10
// }
