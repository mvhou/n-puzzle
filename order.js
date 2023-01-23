export const solutionLookup = {}

export const getSolution = (size) => {
  const arr = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  const getDirection = (idx) =>
    [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
    ][idx % 4];

  let direction = 0;
  let x = -1;
  let y = 0;
  let piece = 1;
  for (let i = size - 0.5; i >= 0; i -= 0.5) {
    for (let j = 0; j < i; j++) {
      const d = getDirection(direction);
      x = (x + d.x) % size;
      y = (y + d.y) % size;
      solutionLookup[piece++] = [y,x]
      // arr[y][x] = piece++;
    }
    direction++;
  }
  console.table(solutionLookup)
  return arr.flat();
};
