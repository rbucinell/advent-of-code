import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

function part1( data ){
    data = data[0];
    let floor = 0;
    for(let i = 0; i < data.length; i++ )
    {
        floor += data[i] === '(' ? 1 : -1;
    }
    return floor;
}

function part2( data ){
    data = data[0];
    let floor = 0;
    let i = 0;
    for(; i < data.length; i++ )
    {
        floor += data[i] === '(' ? 1 : -1;
        if( floor === -1 ) break;
    }
    return i+1;
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) ); //280

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) ); //1797