export const combine = (puzzle, cfg) =>
  cfg.heuristics.reduce((score, h) => score + h(puzzle, cfg), 0);

export const manhattan = (puzzle, cfg) => {
  const size = puzzle.length;
  let score = 0;
  for (let i = 0; i < size; i++) {
    const n = puzzle[i];
    const s = cfg.lookup[n];
    const pieceScore =
      Math.abs((s % cfg.size) - (i % cfg.size)) +
      Math.abs(Math.floor(s / cfg.size) - Math.floor(i / cfg.size));
    score += pieceScore;
  }
  return score * 10;
};

export const inOrder = (puzzle, cfg) => {
  const size = puzzle.length;
  let correct = 9;
  for (let i = 0; i < size; i++) {
    if (puzzle[i] !== cfg.solution[i]) return correct;
    correct--;
  }
  return correct * 10;
};

export const inversions = (puzzle, cfg) => {
  const size = puzzle.length;
  let inversions = 0;
  for (let i = 0; i < size; i++) {
    const pos = cfg.lookup[puzzle[i]];
    if (puzzle[i] !== 0) {
      for (let j = i + 1; j < size; j++) {
        if (pos > cfg.lookup[puzzle[j]] && puzzle[j] !== 0) inversions++;
      }
    }
  }
  return inversions;
};
