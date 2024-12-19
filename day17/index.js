var data = require('fs').readFileSync('day17/input.txt', 'utf8')
data = data.trim().split('\n\n')

let registers = { A: 0, B: 0, C: 0 }
let instructions = []
let instructionPointer = 0
let output = []

registers.A = Number(data[0].match(/\d+/gm)[0])
registers.B = Number(data[0].match(/\d+/gm)[1])
registers.C = Number(data[0].match(/\d+/gm)[2])
instructions = data[1].split(' ')[1].split(',').map(Number)


//Part 1
while (instructionPointer < instructions.length - 1) solve()

let part1Output = output.join(',')
console.log('Part 1:', part1Output); //4,1,7,6,4,1,0,2,7

//Part 2
let j = 0;
for (let i = instructions.length - 1; i >= 0; i--) {
    j *= 8;
    const currTarget = instructions.slice(i).join(",");
    while (true) {
        output.length = 0
        instructionPointer = 0
        registers.A = j
        while (instructionPointer < instructions.length - 1) solve()
        const curr = output.join(",");
        if (curr === currTarget) {
            break;
        }
        j++;
    }
}
console.log('Part 2:', j);




function solve() {
    let opcode = instructions[instructionPointer]
    let operand = instructions[instructionPointer + 1]
    let combo = comboOperand(operand, registers)
    switch (opcode) {
        case 0:
            registers.A = Math.trunc(registers.A / (2 ** combo))
            break
        case 1:
            registers.B ^= operand
            break
        case 2:
            registers.B = combo & 7
            break
        case 3:
            if (registers.A !== 0) {
                instructionPointer = operand
                return
            }
            break
        case 4:
            registers.B ^= registers.C
            break
        case 5:
            output.push(combo & 7)
            break
        case 6:
            registers.B = Math.trunc(registers.A / (2 ** combo))
            break
        case 7:
            registers.C = Math.trunc(registers.A / (2 ** combo))
            break
    }

    instructionPointer += 2
    return
}

function comboOperand(operand) {
    switch (operand) {
        case 0:
        case 1:
        case 2:
        case 3:
            return operand
            break
        case 4:
            return registers.A
            break
        case 5:
            return registers.B
            break
        case 6:
            return registers.C
            break
        case 7:
            return registers.A
            break
    }
}