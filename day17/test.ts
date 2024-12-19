var data = require('fs').readFileSync('day17/input.txt', 'utf8')


let [regs, program] = data.trim().split('\n\n');
const registers = {};
let pointer = 0;
program = program.split(' ')[1].split(',').map(Number);
regs.split('\n').forEach(reg => {
    registers[reg.slice(9, 10)] = Number(reg.slice(12));
});

function getValue(operand) {
    if (operand <= 3) return operand;
    else if (operand === 4) return registers.A;
    else if (operand === 5) return registers.B;
    else if (operand === 6) return registers.C;
    else if (operand === 7) return registers.A;
    throw new Error("Invalid combo operand 7");
}

function exec(opcode, operand) {
    switch (opcode) {
        case 0:
            registers.A = Math.floor(registers.A / 2**getValue(operand));
            break;
            
        case 1:
            registers.B ^= operand;
            break;

        case 2:
            registers.B = getValue(operand) % 8;
            break;

        case 3:
            if (registers.A !== 0) {
                pointer = operand;
                return true;
            }
            break;
            
        case 4:
            registers.B ^= registers.C;
            break;

        case 5:
            r1.push(getValue(operand)%8);
            break;

        case 6:
            registers.B = Math.floor(registers.A / 2**getValue(operand));
            break;

        case 7:
            registers.C = Math.floor(registers.A / 2**getValue(operand));
            break;
    }
}
const r1 = [];
while (pointer < program.length) {
    const opcode = program[pointer];
    const operand = program[pointer+1];
    const jump = exec(opcode, operand);
    if (!jump) pointer += 2;
}
console.log('Part 1 ->',r1.join(','));