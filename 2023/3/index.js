import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

const isNumber = ( c => /^\d+$/.test(c) );
const symbols =  ['%', '*', '#', '&', '$', '@', '/', '=', '+', '-'];
const isSymbol = ( s => symbols.includes(s));

function hasSymbolNeighbor( row, col, grid ) {
    for( let x = -1; x <= 1; x++ ){
        for( let y = -1; y <= 1; y++ ){
            if( x===0 && y===0 ) continue;
            let r = x + row;
            let c = y + col;
            if( r < 0 || c < 0 ) continue;
            if( r >= grid.length || c >= grid[r].length ) continue;
            if( isSymbol(grid[r][c] ) )
                return true;
        }
    }
    return false;
}

function splitMulti(str, tokens){
    let tempChar = tokens[0];
    for(let i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
}

function part1( data ){
    let numbers = [];
    for( let r = 0; r < data.length; r++) {
        let row = data[r];

        let splitRow = row
            .split('.') //remove all '.'
            .map( e => splitMulti( e, symbols )) //further split on all symbols if two numbers conjoined by symbol
            .flat() // bring all array of arrays down to 1 level
            .filter( e => e !== ''); //filter any empty strings that removed symbols caused.
        let startIndex = 0;
        splitRow.forEach(number => {
            //foreach number get start and end index
            let index = row.indexOf( number, startIndex );
            let endIndex = index + number.length;
            for( let i = index; i <= endIndex; i++ ){
                let curChar = row[i];
                if( hasSymbolNeighbor(r,i,data) ){
                    numbers.push( number );
                    break;
                }
            }                
            startIndex = endIndex;
        });
    }
    return numbers.reduce( (acc,cur) => acc + parseInt(cur), 0);
}

function part2( data ){
    
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );