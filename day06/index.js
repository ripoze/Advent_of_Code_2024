var data = require('fs').readFileSync('day06/input.txt', 'utf8')
data = data.trim().split('\n')

let obstructions = []
let guard = {
    'row': null,
    'col': null,
    'direction': null
}
let orgGuard = {
    'row': null,
    'col': null,
    'direction': null
}
let maxRow = data.length
let maxCol = data[0].length

data.map((row, rowIndex) => {
    row.split('').map((item, colIndex) => {
        if (item == '#') obstructions.push({ 'row': rowIndex, 'col': colIndex })
        if (item == '^') {
            guard.row = rowIndex
            guard.col = colIndex
            guard.direction = {
                row: -1, col: 0
            }
            orgGuard.row = rowIndex
            orgGuard.col = colIndex
            orgGuard.direction = {
                row: -1, col: 0
            }
        }
    })
})

function moveGuard() {
    let nextRow = guard.row + guard.direction.row
    let nextCol = guard.col + guard.direction.col
    if (obstructions.filter(o => o.row == nextRow && o.col == nextCol).length > 0) {
        newDirection = {}
        if (guard.direction.row == 0 && guard.direction.col == -1) newDirection = { row: -1, col: 0 }
        if (guard.direction.row == 0 && guard.direction.col == 1) newDirection = { row: 1, col: 0 }
        if (guard.direction.row == 1 && guard.direction.col == 0) newDirection = { row: 0, col: -1 }
        if (guard.direction.row == -1 && guard.direction.col == 0) newDirection = { row: 0, col: 1 }
        guard.direction.row = newDirection.row
        guard.direction.col = newDirection.col
    } else {
        guard.row = nextRow
        guard.col = nextCol
    }
    if (guard.row > 0 && guard.row < maxRow && guard.col > 0 && guard.col < maxCol) return true
    return false
}

//Part 1
distinctLocations = new Set
let inBounds = true
while (inBounds == true) {
    distinctLocations.add(guard.row + ',' + guard.col)
    inBounds = moveGuard()
}
console.log(`Part 1: ${distinctLocations.size}`); //5208

//Part 2
guard = JSON.parse(JSON.stringify(orgGuard))
let orgObstructions = JSON.parse(JSON.stringify(obstructions))
let maxMoves = 10000
let obstructionPositions = 0

for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
        guard=JSON.parse(JSON.stringify(orgGuard))
        if (!(row == guard.row && col == guard.col)) {
            obstructions=JSON.parse(JSON.stringify(orgObstructions))
            obstructions.push({ 'row': row, 'col': col })
            let inBounds = true
            let moves=0
            while (moves < maxMoves && inBounds) {
                moves++
                inBounds = moveGuard()
            }
            if(inBounds) {
                obstructionPositions++
            }
        }
    }
}
console.log(`Part 2: ${obstructionPositions}`) //1972