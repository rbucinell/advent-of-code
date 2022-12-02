import { Elf } from './elf.js'
import fs from 'fs'

const input = fs.readFileSync('./2022/1/1.input', 'utf8').split('\n').map((num) => parseInt(num, 10));

let elves = [];
let rations = [];
let max = 0;


//dumb approach, should be max heap, will re-write if requires later
for( let i = 0; i < input.length; i++)
{
    let ration = input[i];
    if( isNaN(ration) )
    {
        let elf = new Elf(rations);
        elves.push( elf );
        let sum = elf.calories;
        if( sum > max) max = sum;
        rations = [];
    }
    else
        rations.push( ration );
}
//Part 1 output
console.log( max ); //65912

//Part 2 output
elves.sort( (a,b) => b.calories - a.calories ); //largets to smallest
console.log( elves[0].calories + elves[1].calories + elves[2].calories ); //195625
