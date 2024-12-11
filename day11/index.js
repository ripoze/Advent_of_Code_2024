var data = require('fs').readFileSync('day11/input.txt', 'utf8')
data = data.trim().split(' ').map(n => Number(n))


let stones = {}
data = data.map(n => stones[n] = 1)

function processNumbers(numbers) {
  let newStones = {}
  Object.keys(numbers).map(stone => {
    stone = Number(stone)
    if (stone === 0) {
      newStones[1] = numbers[stone]
    } else if (String(stone).length % 2 === 0) {
      const strNum = String(stone)
      const middle = strNum.length / 2
      newStones[parseInt(strNum.slice(0, middle), 10)] = numbers[stone] + (newStones[parseInt(strNum.slice(0, middle), 10)] || 0)
      newStones[parseInt(strNum.slice(middle), 10)] = numbers[stone] + (newStones[parseInt(strNum.slice(middle), 10)] || 0)
    } else {
      newStones[stone * 2024] = numbers[stone] + (newStones[stone * 2024] || 0)
    }
  })
  numbers = newStones
  return newStones
}

for (let i = 0; i < 25; i++) {
  stones = processNumbers(stones)
}
console.log(`Part 1: ${Object.values(stones).reduce((sum, amount) => sum + amount)}`)

for (let i = 0; i < 50; i++) {
  stones = processNumbers(stones)
}
console.log(`Part 2: ${Object.values(stones).reduce((sum, amount) => sum + amount)}`)
