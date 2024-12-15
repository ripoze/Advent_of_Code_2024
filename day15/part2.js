var data = require('fs').readFileSync('day15/input.txt', 'utf8')
data = data.trim().split('\n\n')

let grid = data[0].split('\n').map(r => r.split(''))
let moves = data[1].split('').filter(m => m != '\n')
let maxX = grid[0].length * 2
let maxY = grid.length

let boxes = []
let walls = []
let robot
for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX / 2; x++) {
        if (grid[y][x] == 'O') boxes.push([[y, x * 2], [y, x * 2 + 1]])
        if (grid[y][x] == '@') robot = [y, x * 2]
        if (grid[y][x] == '#') walls.push([y, x * 2], [y, x * 2 + 1])
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
    if (!containsCoordinates(walls, newRobotPosition) && !containsCoordinatesInBoxes(boxes, newRobotPosition)) {
        robot = newRobotPosition
        continue
    }
    //Wall
    if (containsCoordinates(walls, newRobotPosition)) {
        //console.log('Wall');
        continue
    }
    //Box
    if (containsCoordinatesInBoxes(boxes, newRobotPosition)) {
        //can box be moved?
        let canBeMoved = true
        let boxesToMove = getBox(boxes, newRobotPosition)
        let i = 0
        while (i < 1000) {
            let wall = false
            boxesToMove.map(box => {
                let nextBox = addCoordinates(box, move)
                if (containsCoordinates(walls, nextBox)) canBeMoved = false
                if (containsCoordinatesInBoxes(boxes, nextBox)) boxesToMove.push(...getBox(boxes, nextBox))
            })
            boxesToMove = removeDuplicateCoordinates(boxesToMove)
            i++
        }

        if (canBeMoved) {
            //remove old box locations
            boxes = boxes.map(box => {
                if (containsCoordinates(boxesToMove,box[0])) box[0] = addCoordinates(box[0], move)
                if (containsCoordinates(boxesToMove,box[1])) box[1] = addCoordinates(box[1], move)

                return box
            })
            robot = newRobotPosition
        }
        continue
    }
}
drawMap()
let part2= boxes.reduce((sum, box) => {
    let value=box[0][0]*100 + box[0][1]
    sum += value
    return sum
},0)
console.log(`Part 2: ${part2}`) //1516544

function drawMap() {
    for (let y = 0; y < maxY; y++) {
        let row = y % 10 + ' '
        for (let x = 0; x < maxX; x++) {
            if (containsCoordinates(walls, [y, x])) {
                row += '#';
                continue
            }
            if (containsCoordinatesInBoxes(boxes, [y, x])) {
                row += containsCoordinatesInBoxes(boxes, [y, x]);
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
function containsCoordinatesInBoxes(array, [x, y]) {
    let result = false
    array.map(a => {
        if (a[0][0] == x && a[0][1] == y) result = '['
        if (a[1][0] == x && a[1][1] == y) result = ']'
    })
    return result

}
function addCoordinates(arr1, arr2) {
    return [arr1[0] + arr2[0], arr1[1] + arr2[1]]
}
function getBox(array, [x, y]) {
    let result = []
    array.map(a => {
        if (a[0][0] == x && a[0][1] == y) result = JSON.parse(JSON.stringify(a))
        if (a[1][0] == x && a[1][1] == y) result = JSON.parse(JSON.stringify(a))
    })
    return result
}

function removeDuplicateCoordinates(array) {
    return array.filter((item, index, self) =>
        index === self.findIndex(coord => JSON.stringify(coord) === JSON.stringify(item))
    );
}