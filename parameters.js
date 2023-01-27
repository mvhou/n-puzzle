import { inOrder, inversions, manhattan } from "./heuristics.js"
import { generateConsecutive, generateSnail } from "./solution.js"

const heuristics = (key) => [({
  manhattan: manhattan,
  inorder: inOrder,
  inversions: inversions,
})[key] || manhattan]

const order = (key) => ({
  snail: generateSnail,
  consecutive: generateConsecutive
})[key] || generateSnail

export const parameters = (input) => {
  const pMap = new Map()
  pMap.set("o", generateSnail)
  pMap.set("h", manhattan)

  input.filter(e => e.length > 1 && e[1] === '=' && p.has(e.split("="))).forEach(parameter => {
    const p = parameter.split("=") 
    pMap.set(({o:order, h: heuristics})[p[0]](p[1]))
  })
  return pMap
}