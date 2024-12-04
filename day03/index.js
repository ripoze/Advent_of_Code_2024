var data = require('fs').readFileSync('day03/input.txt', 'utf8')
data = data.trim().split('\n')


let arr = []
data.map(row => arr.push(...row.match(/mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g)))

let multiplications = arr.map(mul => {
    if (mul.match(/\d+/g)) {
        return [Number(mul.match(/\d+/g)[0]), Number(mul.match(/\d+/g)[1])]
    }
}).filter(s => s)

let part1 = multiplications.reduce((sum, r) => sum + r[0] * r[1], 0)
console.log(`Part 1: ${part1}`) //173731097



let doEnabled = true
multiplications = arr.map((cmd, i) => {
    if (cmd == 'do()') doEnabled = true
    if (cmd == "don't()") doEnabled = false
    if (cmd.match(/\d+/g) && doEnabled) {
        return [Number(cmd.match(/\d+/g)[0]), Number(cmd.match(/\d+/g)[1])]
    }
}).filter(s => s)


let part2 = multiplications.reduce((sum, r) => sum + r[0] * r[1], 0)
console.log(`Part 2: ${part2}`) //93729253