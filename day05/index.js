var data = require('fs').readFileSync('day05/input.txt', 'utf8')
data = data.trim().split('\n\n')

let rules = data[0].split('\n')//.map(rule => rule.split('|').map(n => Number(n)))
let updates = data[1].split('\n').map(update => update.split(',').map(n => Number(n)))

correctUpdates = updates.filter(update => isUpdateValid(update, rules))
let part1 = correctUpdates.reduce((sum, curr) => sum + curr[Math.trunc(curr.length / 2)], 0)
console.log(`Part 1: ${part1}`)//4959

inCorrectUpdates = updates.filter(update => !isUpdateValid(update, rules))
inCorrectUpdates = inCorrectUpdates.map(update => fixIncorrectUpdate(update, rules))
let part2 = inCorrectUpdates.reduce((sum, curr) => sum + curr[Math.trunc(curr.length / 2)], 0)
console.log(`Part 2: ${part2}`)//4655

function isUpdateValid(u, rules) {
    for (let i = 0; i < u.length - 1; i++) {
        if (rules.indexOf(`${u[i]}|${u[i + 1]}`) < 0) {
            return false
        }
    }
    return true
}

function fixIncorrectUpdate(u, rules) {
    rulesArr = rules.map(rule => rule.split('|').map(n => Number(n)))
    let numbers = {}
    u.map(r => numbers[r]=0)

    for (let i = 0; i < u.length; i++) {
        let rulesOfNumber = rulesArr.filter(n => n[0] == u[i] && u.indexOf(n[1]) > -1)
        rulesOfNumber.map(rule=>{
            numbers[rule[0]]++
        })
    }

    let correctedUpdate = []
    for(property in numbers){
        correctedUpdate[numbers[property]]=Number(property)
    }
    return correctedUpdate
}