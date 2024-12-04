var data = require('fs').readFileSync('day01/input.txt', 'utf8')
data = data.trim().split('\n')

let leftTable = []
let rightTable = []

data.map(str => {
    leftTable.push(Number(str.match(/\d+/g)[0]))
    rightTable.push(Number(str.match(/\d+/g)[1]))
})

leftTable.sort()
rightTable.sort()

let part1 = leftTable.reduce((distance, currentValue, index) =>
    distance + Math.abs(currentValue - rightTable[index])
    , 0);

console.log(`Part 1: ${part1}`) //1579939

let part2 = leftTable.reduce((similarity, currentValue, index) =>
    similarity + currentValue * rightTable.filter(n => n == currentValue).length
,0)
console.log(`Part 2: ${part2}`); //371 too low