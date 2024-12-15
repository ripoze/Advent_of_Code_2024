var data = require('fs').readFileSync('day15/input.txt', 'utf8')
data = data.trim().split('\n\n')

let grid = data[0].split('\n').map(r => r.split(''))
let moves = data[1].split('').filter(m => m != '\n')
let maxX = grid[0].length
let maxY = grid.length

let boxes = []
let walls = []
let robot
for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
        if (grid[y][x] == 'O') boxes.push([y, x])
        if (grid[y][x] == '@') robot = [y, x]
        if (grid[y][x] == '#') walls.push([y, x])
    }
}
moves = moves.map(move => {
    if (move == '<') return [0, -1]
    if (move == '>') return [0, 1]
    if (move == '^') return [-1, 0]
    if (move == 'v') return [1, 0]
})

while (moves.length > 0) {
    //drawMap()
    let move = moves.shift()
    let newRobotPosition = addCoordinates(robot, move)
    //Empty space
    if (!containsCoordinates(walls, newRobotPosition) && !containsCoordinates(boxes, newRobotPosition)) {
        robot = newRobotPosition
        continue
    }
    //Wall
    if (containsCoordinates(walls, newRobotPosition)) {
        //console.log('Wall');
        continue
    }
    //Box
    if (containsCoordinates(boxes, newRobotPosition)) {
        //can box be moved?
        let next = newRobotPosition
        let canBeMoved = false
        let boxesToMove = []
        while (next[0] > 0 && next[0] < maxY && next[1] > 0 && next[1] < maxX) {
            boxesToMove.push(next)
            next = addCoordinates(next, move)

            if (containsCoordinates(walls, next)) {
                canBeMoved = false
                break
            }
            if (!containsCoordinates(walls, next) && !containsCoordinates(boxes, next)) {
                canBeMoved = true
                break
            }
        }

        if (canBeMoved) {
            //remove old box locations
            boxesToMove.map(b => {
                boxes = boxes.filter(box => !(b[0] == box[0] && b[1] == box[1]))
            })
            boxesToMove.map(b => {
                boxes.push(addCoordinates(b, move))
            })
            robot = newRobotPosition
        }
        continue
    }
}
drawMap()
let part1 = boxes.reduce((sum, box) => sum += box[0] * 100 + box[1], 0)
console.log(`Part 1: ${part1}`) //1515788

function drawMap() {
    for (let y = 0; y < maxY; y++) {
        let row = y % 10 + ' '
        for (let x = 0; x < maxX; x++) {
            if (containsCoordinates(walls, [y, x])) {
                row += '#';
                continue
            }
            if (containsCoordinates(boxes, [y, x])) {
                row += 'O';
                continue
            }
            if (x == robot[1] && y == robot[0]) {
                row += '@'
                continue
            }
            row += '.'
        }
        console.log(row);
    }
    console.log('');
}
function containsCoordinates(array, [x, y]) {
    return array.some(([cx, cy]) => cx === x && cy === y);
}
function addCoordinates(arr1, arr2) {
    return [arr1[0] + arr2[0], arr1[1] + arr2[1]]
}