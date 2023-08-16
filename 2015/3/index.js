import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

class Point{
    constructor( x, y) { this.x = x; this.y = y;}
}

function part1( data ){
    data = data[0];//just one line
    let houses = [];
    let x = 0, y = 0;
    houses.push({x:x, y:y});
    for( let i = 0; i < data.length; i++ )
    {
        let cur = data[i];
        if( cur === '^') y -=1;
        if( cur === 'v') y +=1;
        if( cur === '<') x -=1;
        if( cur === '>') x +=1;
        if( !houses.some( h => h.x === x && h.y === y))
            houses.push( {x:x, y:y} );
    }
    return houses.length;
}

function part2( data ){
    data = data[0];
    let santa = {x:0, y:0};
    let robo = {x:0, y:0};
    let houses = [ {x:0, y:0} ]
    for( let i = 0; i < data.length; i++ )
    {
        let deliverer = i % 2=== 0 ? santa : robo;
        let cur = data[i];
        if( cur === '^') deliverer.y -=1;
        if( cur === 'v') deliverer.y +=1;
        if( cur === '<') deliverer.x -=1;
        if( cur === '>') deliverer.x +=1;
        if( !houses.some( h => h.x === deliverer.x && h.y === deliverer.y))
            houses.push( {x:deliverer.x, y:deliverer.y} );
    }
    return houses.length;
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) ); //2572

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );