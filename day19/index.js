var data = require('fs').readFileSync('day19/input.txt', 'utf8')
data = data.trim().split('\n\n')

let patterns = data[0].split(', ')
let designs = data[1].split('\n')


let result = designs.reduce((sum, design) => sum +=canBreakIntoPatterns(patterns, design)? 1:0, 0)
console.log(`Part 1: ${result}`) //238

let part2 = designs.reduce((sum, design) => sum += countBreaksIntoPatterns(patterns, design), 0)
console.log(`Part 2: ${part2}`) //635018909726691

function canBreakIntoPatterns(patterns, inputString) {
    const memo = new Map();

    function helper(remainingString) {
        if (remainingString === "") {
            return true;
        }

        if (memo.has(remainingString)) {
            return memo.get(remainingString);
        }

        for (const pattern of patterns) {
            if (remainingString.startsWith(pattern)) {
                if (helper(remainingString.slice(pattern.length))) {
                    memo.set(remainingString, true);
                    return true;
                }
            }
        }

        memo.set(remainingString, false);
        return false;
    }

    return helper(inputString);
}

function countBreaksIntoPatterns(patterns, inputString) {
    const memo = new Map();

    function helper(remainingString) {
        if (remainingString === "") {
            return 1; // One valid way to split an empty string
        }

        if (memo.has(remainingString)) {
            return memo.get(remainingString);
        }

        let count = 0;
        for (const pattern of patterns) {
            if (remainingString.startsWith(pattern)) {
                count += helper(remainingString.slice(pattern.length));
            }
        }

        memo.set(remainingString, count);
        return count;
    }

    return helper(inputString);
}