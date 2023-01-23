

const pos = (x,y) => ({x:x, y:y})

const e = (puzzle) => {
  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle.length; x++) {
      if (puzzle[y][x] === 0) return pos(x,y)
    }
  }
}

export const solver = (p) => {
  let empty = e(p)

  const pzl = p

  const getPiece = (puzzle, position) => puzzle[position.y][position.x]

  const getNodes = () => getAdjacent(empty)

  const open = new Set()

  const closed = new Set()

  const newState = (puzzle, a, b) => {
    const temp = getPiece(puzzle, a)
    puzzle[a.y][a.x] = getPiece(b)
    puzzle[b.y][b.x] = temp
    return puzzle
  }

  const getAdjacent = (puzzle, position) => {
    const adjacent = []
    if (position.x > 0) adjacent.push(pos(position.x - 1, position.y))
    if (position.y > 0) adjacent.push(pos(position.x, position.y - 1))
    if (position.x < pzl.length - 1) adjacent.push(pos(position.x + 1, position.y))
    if (position.y < pzl.length - 1) adjacent.push(pos(position.x, position.y + 1))
    return adjacent.map(a => newState(structuredClone(puzzle), a, position))
  }

  const aStar = () => {
    const nodes = getAdjacent(p, e)
    while (nodes.length > 0) {
      nodes 
    }
  }

  return {
    getAdjacent,
    getPiece,
    getNodes,
    empty
  }
}