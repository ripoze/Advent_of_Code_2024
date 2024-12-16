var data = require('fs').readFileSync('day16/input.txt', 'utf8')
data = data.trim().split('\n').map(row => row.split(""))

function solveMaze(grid) {
    const directions = [
        { name: "N", dx: 0, dy: -1 },
        { name: "E", dx: 1, dy: 0 },
        { name: "S", dx: 0, dy: 1 },
        { name: "W", dx: -1, dy: 0 },
    ];

    // Parse grid and locate Start (S) and End (E)
    let start, end;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "S") start = { x, y };
            if (grid[y][x] === "E") end = { x, y };
        }
    }

    const queue = [
        { x: start.x, y: start.y, dir: 1, score: 0, path: [[start.x, start.y]] },
    ];
    const visited = new Map(); // Map to track visited states with minimum score
    let minScore = Infinity;
    const bestPaths = [];

    while (queue.length > 0) {
        queue.sort((a, b) => a.score - b.score); // Sort by score
        const { x, y, dir, score, path } = queue.shift();

        // If we've reached the end
        if (x === end.x && y === end.y) {
            if (score < minScore) {
                minScore = score;
                bestPaths.length = 0; // Clear previous paths
                bestPaths.push({path,score});
            } else if (score === minScore) {
                bestPaths.push({path,score}); // Add another path with the same minimum score
            }
            continue; // Continue to explore other possible routes
        }

        // Mark the state as visited
        const stateKey = `${x},${y},${dir}`;
        if (visited.has(stateKey) && visited.get(stateKey) < score) continue;
        visited.set(stateKey, score);

        // Explore all possible moves
        // 1. Move forward
        const nx = x + directions[dir].dx;
        const ny = y + directions[dir].dy;
        if (grid[ny] && grid[ny][nx] && grid[ny][nx] !== "#") {
            queue.push({
                x: nx,
                y: ny,
                dir,
                score: score + 1,
                path: [...path, [nx, ny]],
            });
        }

        // 2. Rotate clockwise
        const clockwise = (dir + 1) % 4;
        queue.push({
            x,
            y,
            dir: clockwise,
            score: score + 1000,
            path: [...path],
        });

        // 3. Rotate counterclockwise
        const counterclockwise = (dir + 3) % 4; // Equivalent to (dir - 1 + 4) % 4
        queue.push({
            x,
            y,
            dir: counterclockwise,
            score: score + 1000,
            path: [...path],
        });
    }

    return bestPaths; // Return all lowest scoring paths
}


// Solve
const result = solveMaze(data);
console.log(`Part 1: ${result[0].score}`); //83444

let bestTiles=new Set()
result.map(r=>{
    r.path.map(c=>bestTiles.add(`${c[0]}, ${c[1]}`))
})
console.log(`Part 2: ${bestTiles.size}`) //483