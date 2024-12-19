var data = require('fs').readFileSync('day18/input.txt', 'utf8')
data = data.trim().split('\n').map(n => n.split(',').map(Number))


function findShortestRoute(start, exit, width, height, obstacles) {
    const directions = [
        [0, 1],  // Right
        [1, 0],  // Down
        [0, -1], // Left
        [-1, 0]  // Up
    ];

    const isValid = (x, y) => {
        return (
            x >= 0 && y >= 0 && x < height && y < width && !obstacleSet.has(`${x},${y}`)
        );
    };

    const obstacleSet = new Set(obstacles.map(([x, y]) => `${x},${y}`));
    const queue = [[start, [start]]];
    const visited = new Set([`${start[0]},${start[1]}`]);

    while (queue.length > 0) {
        const [[currentX, currentY], path] = queue.shift();

        if (currentX === exit[0] && currentY === exit[1]) {
            return path;
        }

        for (const [dx, dy] of directions) {
            const nextX = currentX + dx;
            const nextY = currentY + dy;

            if (isValid(nextX, nextY) && !visited.has(`${nextX},${nextY}`)) {
                visited.add(`${nextX},${nextY}`);
                queue.push([[nextX, nextY], [...path, [nextX, nextY]]]);
            }
        }
    }

    return null; // Return null if no route is found
}

function drawMap() {
    const obstacleSet = new Set(obstacles.map(([x, y]) => `${x},${y}`));
    let routeSet = new Set()
    if(shortestRoute) routeSet = new Set(shortestRoute.map(([x, y]) => `${x},${y}`));
    for (let y = 0; y < height; y++) {
        let row = ''
        for (let x = 0; x < width; x++) {
            
            if(obstacleSet.has(`${x},${y}`)) row+='#'
            else if (routeSet && routeSet.has(`${x},${y}`)) row+='O'
            else row+='.'
        }
        console.log(row);
    }

}

const start = [0, 0];
const exit = [70, 70];
const width = 71;
const height = 71;
let obstacles = [...data.slice(0,12)];

let shortestRoute = findShortestRoute(start, exit, width, height, obstacles)
drawMap()
console.log(`Part 1: ${shortestRoute && shortestRoute.length-1}`);//320

let i=1
while(true){
    obstacles = [...data.slice(0,i)];
    shortestRoute = findShortestRoute(start, exit, width, height, obstacles)
    if(!shortestRoute){
        console.log(`Part 2:  ${data[i-1]}`); //34,40
        break
    }
    i++
}