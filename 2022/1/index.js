const fs = require( 'fs' );
const input = fs.readFileSync('./2022/1/1.input', 'utf8').split('\n').map((num) => parseInt(num, 10));

let elves = [];
let elf = [];

console.log (input);

let max = 0;

for( let i = 0; i < input.length; i++)
{
    let ration = input[i];
    if( isNaN(ration) )
    {
        elves.push( [...elf] );
        let sum = elf.reduce((p,c) => p+c, 0);
        if( sum > max) max = sum;
        elf = [];
    }
    else
        elf.push( ration );
}
console.log( max ); //65912