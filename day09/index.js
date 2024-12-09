var data = require('fs').readFileSync('day09/input.txt', 'utf8')
data = data.trim().split('').map(n => Number(n))

function checksum(disk) {
    return disk.reduce((sum, n, index) => sum + (n != '.' ? n * index : 0), 0)
}

function createDisk(data) {
    let disk = []
    for (let i = 0; i < data.length; i++) {
        let id = parseInt(i / 2)
        if (i % 2 == 0) { //file
            for (let n = 0; n < data[i]; n++) {
                disk.push(id)
            }
        } else { //empty space
            for (let n = 0; n < data[i]; n++) {
                disk.push('.')
            }
        }
    }
    return disk
}


//Part 1

let disk = createDisk(data)
//move files from back to empty spaces
for (let i = 0; i < disk.length; i++) {
    if (disk[i] == '.') {
        while (disk[disk.length - 1] == '.') disk.pop()
        disk[i] = disk.pop()
    }
}

console.log(`Part 1: ${checksum(disk)}`) //6225730762521


//Part 2
disk = createDisk(data)

let fileIndex = disk.length - 1
let lastFileIndex
while (fileIndex > 0) {
    //find last file
    if (disk[fileIndex] != '.') {
        lastFileIndex = fileIndex
        while (disk[fileIndex - 1] == disk[lastFileIndex]) fileIndex--
    }
    let fileLength = lastFileIndex - fileIndex + 1

    //find empty
    let firstEmpty
    let lastEmpty
    for (let i = 0; i < fileIndex; i++) {
        if (disk[i] == '.') {
            firstEmpty = i
            while (disk[i + 1] == '.') i++

            if (i - firstEmpty + 1 >= fileLength) {
                lastEmpty = i
                break
            }
        }
    }

    //move file
    if (lastEmpty > 0) {
        for (let i = fileIndex; i <= lastFileIndex; i++) {
            disk[firstEmpty + i - fileIndex] = disk[i]
            disk[i] = '.'
        }
    }

    fileIndex--
}

console.log(`Part 2: ${checksum(disk)}`) //6250605700557