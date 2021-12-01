const fs = require( 'fs' );
const input = fs.readFileSync('part1-input', 'utf8').split('\n').map((num) => parseInt(num, 10));

let counter = 0;
input.forEach( (val, i, arr) => counter += val > arr[i-1] ? 1 : 0);
console.log( counter );
