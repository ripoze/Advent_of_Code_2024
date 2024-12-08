var data = require('fs').readFileSync('day08/input.txt', 'utf8')
data = data.trim().split('\n').map(r => r.split(''))

let antennas = []
let maxRow = data.length
let maxCol = data[0].length

data.map((row, rowIndex) => {
    row.map((col, colIndex) => {
        if (col != '.') antennas.push({ frequency: col, row: rowIndex, col: colIndex })
    })
})

//Part 1
let antinodes = []
antennas.map(a => {
    antinodes.push(...findAntinodes(a))
})
//remove duplicates
let antinodeset = new Set
antinodes.map(a => antinodeset.add(`{"col":${a.col}, "row":${a.row}}`))
antinodes = [...antinodeset].map(a => JSON.parse(a))
console.log(`Part 1: ${antinodes.length}`) //222

//Part 2
antinodes = []
antennas.map(a => {
    antinodes.push(...findAntinodes2(a))
})
//remove duplicates
antinodeset = new Set
antinodes.map(a => antinodeset.add(`{"col":${a.col}, "row":${a.row}}`))
antinodes = [...antinodeset].map(a => JSON.parse(a))
console.log(`Part 2: ${antinodes.length}`) //



function findAntinodes(antenna) {
    let antinodes = []
    antennas.map(ant => {
        if (!(antenna.row == ant.row && antenna.col == ant.col) && antenna.frequency == ant.frequency) {
            let dRow = antenna.row - ant.row
            let dCol = antenna.col - ant.col
            antinodes.push({ row: antenna.row + dRow, col: antenna.col + dCol })
        }
    })
    //remove out of area
    antinodes = antinodes.filter(a => a.row >= 0 && a.row < maxRow && a.col >= 0 && a.col < maxCol)

    return antinodes
}

function findAntinodes2(antenna) {
    let antinodes = []
    antennas.map(ant => {
        if (!(antenna.row == ant.row && antenna.col == ant.col) && antenna.frequency == ant.frequency) {
            let dRow = antenna.row - ant.row
            let dCol = antenna.col - ant.col
            let i=0
            while (antenna.row + i*dRow >= 0 && antenna.row + i*dRow < maxRow) {
                antinodes.push({ row: antenna.row + i*dRow, col: antenna.col + i*dCol })
                i++
            }
        }
    })
    //remove out of area
    antinodes = antinodes.filter(a => a.row >= 0 && a.row < maxRow && a.col >= 0 && a.col < maxCol)

    return antinodes
}