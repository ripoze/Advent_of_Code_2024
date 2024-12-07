const { reduce } = require('async');

var data = require('fs').readFileSync('day07/input.txt', 'utf8')
data = data.trim().split('\n')

data = data.map(row => row.match(/\d+/g).map(n => Number(n)))
data = data.map(row => row = { 'testValue': row[0], 'values': row.slice(1) })
let data1 = JSON.parse(JSON.stringify(data))
let data2 = JSON.parse(JSON.stringify(data))

data1 = data1.map(row => {
    row.reduced = reduceRow_pt1(row.values).map(r => r[0])
    row.valid = row.reduced.includes(row.testValue)
    return row
})
let part1 = data1.reduce((sum, r) => {
    if (r.valid) return sum + r.testValue
    return sum
}, 0)
console.log(`Part 1: ${part1}`) //2299996598890


data2 = data2.map(row => {
    row.reduced = reduceRow_pt2(row.values).map(r => r[0])
    row.valid = row.reduced.includes(row.testValue)
    return row
})
let part2 = data2.reduce((sum, r) => {
    if (r.valid) return sum + r.testValue
    return sum
}, 0)
console.log(`Part 2: ${part2}`) //362646859298554



function reduceRow_pt1(row) {
    let result = [row]
    while (result[0].length > 1) {
        let v1 = result[0][0]
        let v2 = result[0][1]
        let r = result[0].splice(2)
        result.shift()
        result.push([v1 + v2, ...r])
        result.push([v1 * v2, ...r])
    }
    return result
}


function reduceRow_pt2(row) {
    let result = [row]
    while (result[0] && result[0].length > 1) {
        let v1 = result[0][0]
        let v2 = result[0][1]
        let r = result[0].splice(2)
        result.shift()
        result.push([v1 + v2, ...r])
        result.push([v1 * v2, ...r])
        result.push([concatenate(v1, v2), ...r])
    }
    return result

    function concatenate(v1, v2) {
        return Number('' + v1 + v2)
    }
}