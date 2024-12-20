var data = require('fs').readFileSync('day20/input.txt', 'utf8')
data = data.trim().split('\n').map(n => n.split(''))

let maxX = data[0].length
let maxY = data.length
let start
let exit
const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [0, -1],  // left
    [-1, 0]   // up
];

for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
        if (data[y][x] == 'S') start = [y, x]
        if (data[y][x] == 'E') exit = [y, x]
    }
}
const shortestPath = findShortestPath(start, exit, data);

let cheatPaths = []
shortestPath.map((cheatStart, startIndex) => {
    shortestPath.map((cheatEnd, endIndex) => {
        if (Math.abs(cheatStart[0] - cheatEnd[0]) + Math.abs(cheatStart[1] - cheatEnd[1]) <= 2) {
            let savedDistance = endIndex - startIndex -2
            if(savedDistance>=100) cheatPaths.push(savedDistance)
        }
    })
})
console.log(`Part 1: ${cheatPaths.length}`); //1497


//Part 2
cheatPaths.length=0
shortestPath.map((cheatStart, startIndex) => {
    shortestPath.map((cheatEnd, endIndex) => {
        let distance=Math.abs(cheatStart[0] - cheatEnd[0]) + Math.abs(cheatStart[1] - cheatEnd[1])
        if ( distance <= 20) {
            let savedDistance = endIndex - startIndex -distance
            if(savedDistance>=100) cheatPaths.push(savedDistance)
        }
    })
})
console.log(`Part 2: ${cheatPaths.length}`); //1030809 too high

function findShortestPath(start, exit, mapArray) {
    const directions = [
        [0, 1],   // right
        [1, 0],   // down
        [0, -1],  // left
        [-1, 0]   // up
    ];

    const rows = mapArray.length;
    const cols = mapArray[0].length;
    const queue = [];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));


    // Locate 'S' and 'E'
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (mapArray[r][c] === 'S') start = [r, c];
            if (mapArray[r][c] === 'E') exit = [r, c];
        }
    }

    if (!start || !exit) {
        throw new Error("Map must contain both a starting point ('S') and an exit point ('E').");
    }

    // Initialize BFS
    queue.push({ position: start, path: [start] });
    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
        const current = queue.shift();
        const [currentRow, currentCol] = current.position;

        // Check if we reached the end
        if (currentRow === exit[0] && currentCol === exit[1]) {
            return current.path;
        }

        // Explore neighbors
        for (const [dRow, dCol] of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;

            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                !visited[newRow][newCol] &&
                mapArray[newRow][newCol] !== '#'
            ) {
                visited[newRow][newCol] = true;
                queue.push({
                    position: [newRow, newCol],
                    path: [...current.path, [newRow, newCol]]
                });
            }
        }
    }

    // No path found
    return null;
}