var data = require('fs').readFileSync('day02/input.txt', 'utf8')
data = data.trim().split('\n')

let reports = data.map(row => row.split(' ').map(n => Number(n)))


function isSafe(arr) {
    function changes(arr) {
        let result = []
        for (let i = 0; i < arr.length - 1; i++) {
            result.push(arr[i + 1] - arr[i])
        }
        return result
    }
    let changeArray = changes(arr).sort((a, b) => a - b)
    let increasing = changeArray[0] > 0 && changeArray[changeArray.length - 1] < 4
    let decreasing = changeArray[0] < 0 && changeArray[0] > -4 && changeArray[changeArray.length - 1] > -4 && changeArray[changeArray.length - 1] < 0
    return increasing || decreasing
}
function removeBadLevel(arr) {
    for (let i = 0; i < arr.length; i++) {
        let testArr = [...arr]
        testArr.splice(i, 1)
        if (isSafe(testArr)) {
            return true
        }
    }
    return false
}

let part1 = reports.reduce((safeReports, currentReport) => {
    safeReports += isSafe(currentReport) ? 1 : 0
    return safeReports
}, 0)

let part2 = reports.reduce((safeReports, currentReport, index) => {
    safeReports += removeBadLevel(currentReport) ? 1 : 0
    return safeReports
}, 0)

console.log(`Part 1: ${part1}`); //463
console.log(`Part 2: ${part2}`); //514