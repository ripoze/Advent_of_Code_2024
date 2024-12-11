var data = require('fs').readFileSync('day10/input.txt', 'utf8')
data = data.trim().split('\n').map(r => r.split('').map(n => Number(n)))

let maxRow = data.length - 1
let maxCol = data[0].length - 1

let trailheads = []
data.map((row, rowIndex) => row.map((c, colIndex) => {
    if (c == 0) trailheads.push({ origin: [rowIndex, colIndex], trails: [[[rowIndex, colIndex]]] })
}))
trailheads.map(trailhead => {
    for (let i = 0; i < 9; i++) {
        trailhead.trails = trailhead.trails.reduce((trails, t) => {
            let res = findNextSteps(t[t.length - 1])
            res.map(r => trails.push([...t, r]))
            return trails
        }, [])
    }
})

trailheads.map(trailhead => {
    uniqueTrailEnds = new Set
    trailhead.trails.map(t => {
        uniqueTrailEnds.add(`${t[9]}`)
        trailhead.uniqueTrailEnds = uniqueTrailEnds.size
    })
    trailhead.uniqueTrails = trailhead.trails.length
})

console.log(`Part 1: ${trailheads.reduce((sum, t) => sum + t.uniqueTrailEnds, 0)}`) //746
console.log(`Part 2: ${trailheads.reduce((sum, t) => sum + t.uniqueTrails, 0)}`) //1541

function findNextSteps(coords) {
    let row = coords[0]
    let col = coords[1]
    let currentHeigth = data[row][col]

    let result = []
    if (row > 0 && data[row - 1][col] == currentHeigth + 1) result.push([row - 1, col])
    if (row < maxRow && data[row + 1][col] == currentHeigth + 1) result.push([row + 1, col])
    if (col > 0 && data[row][col - 1] == currentHeigth + 1) result.push([row, col - 1])
    if (col < maxCol && data[row][col + 1] == currentHeigth + 1) result.push([row, col + 1])
    return result
}