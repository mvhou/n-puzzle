export const generateConsecutive = (size) => {
  const solution = Array(size * size).fill(0).map((_,i) => i + 1)
  const lookup = solution.map((_,i) => i - 1)
  solution[size * size - 1] = 0
  lookup[0] = size * size - 1
  return { solution, lookup }
}

export const generateSnail = (size) => {
  const arr = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));
  const lookup = new Uint8Array(size * size)
  const solution = new Uint8Array(size * size)
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
      arr[y][x] = piece++;
    }
    direction++;
  }
  arr[y][x] = 0
  const temp = arr.flat()
  console.table(arr)
  solution.map((_,i) => temp[i])
  arr.flat().forEach((x, i) => {
    solution[i] = x
    lookup[x] = i
  })

  return { solution, lookup }
}
