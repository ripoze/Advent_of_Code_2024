var data = require('fs').readFileSync('day22/input.txt', 'utf8')
data = data.trim().split('\n').map(Number)

//Part 1
let part1 = data.map(secretNumber => {
    for (i = 0; i < 2000; i++) {
        secretNumber = evolve(BigInt(secretNumber))
    }
    return secretNumber
})
console.log(`Part 1: ${part1.reduce((a, b) => a + b)}`);


//Part 2
let part2 = []
data.map((secretNumber) => {
    let buyer = [{ price: secretNumber % 10 }]
    for (i = 0; i < 2000; i++) {
        secretNumber = evolve(BigInt(secretNumber))
        let price = Number(secretNumber % 10n)
        buyer.push({ price: price, change: price - buyer[buyer.length - 1].price })
    }
    buyer.shift()
    part2.push(buyer)
})
let changes = new Map()

for (buyer of part2) {
    for (let i = 3; i < buyer.length; i++) {
        let changeArr = [buyer[i - 3].change, buyer[i - 2].change, buyer[i - 1].change, buyer[i].change]
        changes.set(JSON.stringify(changeArr))
    }
}

let maxPrice=0
let index=0
for( [key] of changes){
    let price=findPrice(key, part2)
    changes.set(key,price)
    maxPrice=Math.max(price, maxPrice)
    index++
}

console.log(`Part 2: ${maxPrice}`); //1910

function findPrice(changeString, priceArray) {
    let changes = JSON.parse(changeString)
    let totalPrice=0
    for (buyer of priceArray) {
        let maxPrice = 0
        for (let i = 3; i < buyer.length; i++) {
            if (buyer[i - 3].change == changes[0] &&
                buyer[i - 2].change == changes[1] &&
                buyer[i - 1].change == changes[2] &&
                buyer[i].change == changes[3]
            ) {
                maxPrice = buyer[i].price
                break
            }
        }
        totalPrice+=maxPrice
    }
    return totalPrice
}

function evolve(n) {
    // Calculate the result of multiplying the secret number by 64. 
    // Then, mix this result into the secret number. 
    // Finally, prune the secret number
    let m = n * 64n
    m = mix(m, n)
    n = prune(m)

    // Calculate the result of dividing the secret number by 32. 
    // Round the result down to the nearest integer. 
    // Then, mix this result into the secret number. 
    // Finally, prune the secret number.
    m = n / 32n
    n = mix(m, n)

    // Calculate the result of multiplying the secret number by 2048. 
    // Then, mix this result into the secret number. 
    // Finally, prune the secret number.
    m = n * 2048n
    m = mix(m, n)
    m = prune(m)

    return m
    function mix(a, b) {
        return a ^ b
    }
    function prune(a) {
        return a % 16777216n
    }
}