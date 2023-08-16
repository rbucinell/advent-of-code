import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));


const surfaceArea = ( l, w, h) => 2*l*w+2*w*h+2*h*l;

function part1( data ){
    return data.reduce( (acc,cur) => {
        const [l,w,h] = cur.split('x');
        const sa = surfaceArea( l, w, h );
        const smallest = [l,w,h].sort( (a,b) => a-b ).slice(0,2);
        const extra = smallest[0] * smallest[1];
        return acc + (sa+extra);
    }, 0)
}

function part2( data ){
    return data.reduce( (acc,cur) => {
        const [l,w,h] = cur.split('x');
        const sa = surfaceArea( l, w, h );
        const smallest = [l,w,h].sort( (a,b) => a-b ).slice(0,2);
        const ribbon = (smallest[0]*2+smallest[1]*2);
        const bow = l * w * h;
        return acc + (ribbon + bow)
    }, 0)
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) ); //1586300

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) ); //3737498