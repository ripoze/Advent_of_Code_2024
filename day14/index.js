var data = require('fs').readFileSync('day14/input.txt', 'utf8')
data = data.trim().split('\n')

const maxX = 101
const maxY = 103

let robots = data.map(row => {
    let values = row.match(/-?\d+/g).map(Number)
    return { location: [values[0], values[1]], velocity: [values[2], values[3]] }
})

//move robots
for (let i = 0; i < 100; i++) {
    robots = robots.map(r => {
        r.location = moveRobot(r.location, r.velocity)
        return r
    })
}
//cound robots in quadrants
let quadrants = [0, 0, 0, 0]
robots.map(r => {
    if (r.location[0] < parseInt(maxX / 2) && r.location[1] < parseInt(maxY / 2)) quadrants[0]++
    if (r.location[0] < parseInt(maxX / 2) && r.location[1] > parseInt(maxY / 2)) quadrants[2]++
    if (r.location[0] > parseInt(maxX / 2) && r.location[1] < parseInt(maxY / 2)) quadrants[1]++
    if (r.location[0] > parseInt(maxX / 2) && r.location[1] > parseInt(maxY / 2)) quadrants[3]++
})
console.log(`Part 1: ${quadrants.reduce((res, q) => res *= q, 1)}`) //224969976


let count = 100
while (true) {
    count++
    robots = robots.map(r => {
        r.location = moveRobot(r.location, r.velocity)
        return r
    })
    let testArr = new Array(maxX).fill('.')

    robots.map((r) => {
        if(r.location[1]==50)
        testArr[r.location[0]]='X'
    })
    let testString=testArr.join('')
    if (testString.includes('XXXXXX')) break
    
}
console.log(`Part 2: ${count}`);


function moveRobot(location, velocity) {
    location[0] += velocity[0]
    location[1] += velocity[1]
    if (location[0] < 0) location[0] = maxX + location[0]
    if (location[0] >= maxX) location[0] = location[0] - maxX
    if (location[1] < 0) location[1] = maxY + location[1]
    if (location[1] >= maxY) location[1] = location[1] - maxY
    return location
}