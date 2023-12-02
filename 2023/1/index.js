import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

function part1( data ){
    let sum = 0;
    for( let line of data ){
        let first = 0;
        for( let i = 0; i < line.length; i++ ){
            if( isNaN(parseInt(line[i])) ) continue;
            else {
                first = line[i];
                break;
            }
        }
        let last = 0;
        for( let i = line.length -1; i >= 0; i--){
            if( isNaN(parseInt(line[i])) ) continue;
            else {
                last = line[i];
                break;
            }
        }
        sum += parseInt( `${first}${last}`);
    }
    return sum;
}

function startVal( line ){
    if( line === '') return 0;
    if( isNaN(line[0]) ){
        if( line.startsWith('one')) return 1;
        if( line.startsWith('two')) return 2;
        if( line.startsWith('three')) return 3;
        if( line.startsWith('four')) return 4;
        if( line.startsWith('five')) return 5;
        if( line.startsWith('six')) return 6;
        if( line.startsWith('seve')) return 7;
        if( line.startsWith('eight')) return 8;
        if( line.startsWith('nine')) return 9;
        else return startVal( line.substring(1));
    }else{
        return line[0];
    }
}

function endVal( line ){
    if( line === '') return 0;
    if( isNaN(line[line.length-1]) ){
        if( line.endsWith('one')) return 1;
        if( line.endsWith('two')) return 2;
        if( line.endsWith('three')) return 3;
        if( line.endsWith('four')) return 4;
        if( line.endsWith('five')) return 5;
        if( line.endsWith('six')) return 6;
        if( line.endsWith('seve')) return 7;
        if( line.endsWith('eight')) return 8;
        if( line.endsWith('nine')) return 9;
        else return endVal( line.substring(0,line.length-1));
    }
    else{
        return line[line.length-1];
    }
}

function part2( data ){
    let sum = 0;
    for( let line of data ){
        //line = fixLine( line );
        let first = startVal( line );
        let last = endVal( line );
        sum += parseInt( `${first}${last}`);
    }
    return sum;
    
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );

//Example Part1: 209
//Input   Part1: 54953
//Example Part2: 281
//Input   Part2: 53868