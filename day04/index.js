var data = require('fs').readFileSync('day04/input.txt', 'utf8')
data = data.trim().split('\n').map(s => s.split(''))

let part1Count = 0
let part2Count = 0

for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
        findX(y, x)
        checkXMAS(y, x)
    }
}
console.log(`Part 1: ${part1Count}`); //2493
console.log(`Part 2: ${part2Count}`); //1890

function findX(y, x) {
    if (data[y][x] == 'X') findM(y, x)
}
function findM(y, x) {
    let searchArr = [
        [y - 1, x - 1],
        [y - 1, x],
        [y - 1, x + 1],
        [y, x - 1],
        [y, x + 1],
        [y + 1, x - 1],
        [y + 1, x],
        [y + 1, x + 1],
    ]
    searchArr = searchArr.filter(arr => arr[0] >= 0 && arr[1] >= 0 && arr[0] < data.length && arr[1] < data[0].length)

    searchArr.map(coords => {
        if (data[coords[0]][coords[1]] == 'M') {
            findA(coords[0], coords[1], coords[0] - y, coords[1] - x)
        }
    })
}
function findA(y, x, dy, dx) {
    let searchArr = [
        [y + dy, x + dx]
    ]
    searchArr = searchArr.filter(arr => arr[0] >= 0 && arr[1] >= 0 && arr[0] < data.length && arr[1] < data[0].length)

    searchArr.map(coords => {
        if (data[coords[0]][coords[1]] == 'A') findS(coords[0], coords[1], dy, dx)
    })
}
function findS(y, x, dy, dx) {
    let searchArr = [
        [y + dy, x + dx]
    ]
    searchArr = searchArr.filter(arr => arr[0] >= 0 && arr[1] >= 0 && arr[0] < data.length && arr[1] < data[0].length)

    searchArr.map(coords => {
        if (data[coords[0]][coords[1]] == 'S') {
            part1Count++
        }
    })
}

function checkXMAS(y, x) {
    let yMax = data.length - 1
    let xMax = data[0].length - 1
    let found = 0

    if (data[y][x] == 'A' && y > 0 && y < yMax && x > 0 && x < xMax) {
        if (data[y - 1][x - 1] == 'M') {
            if (data[y + 1][x + 1] == 'S') {
                found++
            }
        }
        if (data[y - 1][x + 1] == 'M') {
            if (data[y + 1][x - 1] == 'S') {
                found++
            }
        }

        if (data[y + 1][x - 1] == 'M') {
            if (data[y - 1][x + 1] == 'S') {
                found++
            }
        }

        if (data[y + 1][x + 1] == 'M') {
            if (data[y - 1][x - 1] == 'S') {
                found++
            }
        }
    }
    if (found > 1) {
        part2Count++
    }
}
