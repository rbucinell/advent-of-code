const fs = require( 'fs' );
const input = fs.readFileSync('input', 'utf8').split('\n').map((num) => parseInt(num, 10));

let counter = 0;
input.forEach( (val, i, arr) => counter += val > arr[i-1] ? 1 : 0);
console.log( `Part 1 = ${counter}` );

threemeasurewindow = input.map((val, index, arr)=> {
    if( index + 2 < arr.length) 
        return (arr[index] + arr[index+1] + arr[index+2]);
} );
console.log( threemeasurewindow);
let counter2 = 0;
threemeasurewindow.forEach( (val, i, arr) => counter2 += val > arr[i-1] ? 1 : 0);
console.log( `Part 2 = ${counter2}`);
