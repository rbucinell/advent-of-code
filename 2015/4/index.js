import {readFromDir} from '../../util/input.js'
import md5 from 'md5';
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

function part1( data ){
    data = data[0];    
    let num = 0;
    while( !md5( `${data}${num}`).startsWith('00000')) num++;
    return num;
}

function part2( data ){
    data = data[0];    
    let num = 0;
    while( !md5( `${data}${num}`).startsWith('000000')) num++;
    return num;
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) ); //346386

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) ); //9958218