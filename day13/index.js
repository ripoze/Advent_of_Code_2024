var data = require('fs').readFileSync('day13/input.txt', 'utf8')
data = data.trim().split('\n\n')
data = data.map(c => {
    let rows = c.split('\n')
    let buttonA = [...rows[0].match(/\d+/g).map(Number), 3]
    let buttonB = [...rows[1].match(/\d+/g).map(Number), 1]
    let prize = rows[2].match(/\d+/g).map(Number)
    return { A: buttonA, B: buttonB, prize: prize }
})

console.log(`Part 1: ${findTotalCost(data)}`); //31897

let part2 = 0;
data.forEach(({ prize }) => {
    prize[0] += 10000000000000
    prize[1] += 10000000000000
})
console.log(`Part 2: ${findTotalCost(data)}`) //87596249540359

function findTotalCost(data) {
    return data.reduce((sum, { A, B, prize }) => {
        const ra = (prize[0] * B[1] - prize[1] * B[0]) / (A[0] * B[1] - A[1] * B[0]);
        const rb = (prize[0] - A[0] * ra) / B[0];
        if (ra % 1 === 0 && rb % 1 === 0) {
            sum += parseInt(ra * 3 + rb);
        }
        return sum
    }, 0)
}