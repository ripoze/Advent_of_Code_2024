var data = require('fs').readFileSync('day12/input.txt', 'utf8')
data = data.trim().split('\n').map(n => n.split(''))

let regions = []
for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
        let targetChar = data[row][col]
        if (targetChar != null) {

            let newRegion = findConnectedCoordinates(data, row, col)
            newRegion.map(coords => {
                data[coords[0]][coords[1]] = null
            })
            regions.push({ 'plant': targetChar, 'coords': newRegion, 'area': newRegion.length, 'edges': [], 'sides': 0 })
        }
    }
}
regions.map(region => {
    region.edges = findEdges(region.coords)

})
console.log(`Part 1: ${regions.reduce((price, o) => price + o.edges.length * o.area, 0)}`); //1361494



function findConnectedCoordinates(grid, row, col) {
    const rows = grid.length;
    const cols = grid[0].length;
    const targetChar = grid[row][col];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const directions = [
        [0, 1],  // Right
        [1, 0],  // Down
        [0, -1], // Left
        [-1, 0]  // Up
    ];

    const result = [];
    const queue = [[row, col]];
    visited[row][col] = true;

    while (queue.length > 0) {
        const [currentRow, currentCol] = queue.shift();
        result.push([currentRow, currentCol]);

        for (const [dRow, dCol] of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;

            if (
                newRow >= 0 && newRow < rows && // Within grid bounds
                newCol >= 0 && newCol < cols &&
                !visited[newRow][newCol] && // Not already visited
                grid[newRow][newCol] === targetChar // Same character
            ) {
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol]);
            }
        }
    }

    return result;
}

function findEdges(coords) {
    let edges = []
    const directions = [
        [0, 1],  // Right
        [1, 0],  // Down
        [0, -1], // Left
        [-1, 0]  // Up
    ];
    coords.map(coord => {
        let row = coord[0]
        let col = coord[1]
        for (const [dRow, dCol] of directions) {
            if (coords.filter(c => c[0] == row + dRow && c[1] == col + dCol).length == 0) edges.push([row + dRow, col + dCol, [dRow,dCol]])
        }
    })
    return edges
}

