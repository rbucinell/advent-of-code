import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

const isNumber = ( c => /^\d+$/.test(c) );
const symbols =  ['%', '*', '#', '&', '$', '@', '/', '=', '+', '-'];
const isSymbol = ( s => symbols.includes(s));

function hasAdjecentSymbol( data, r, c )
{
    for( let i = -1; i <= 1; i++ ) {
        for( let j = -1; j <= 1; j++ ){
            if( i === 0 && j === 0) continue;
            let row = r + i;
            let col = c + j;
            if( row < 0 || col < 0 ) continue;
            if( row >= data.length ) continue;
            if( col >= data[row].length ) continue;
            if( isSymbol( data[row][col] )) 
                return true;
        }
    }
    return false;
}

function part1( data ){

    let partNumbers = [];

    for( let r = 0; r < data.length; r++){

        let curNumbers = '';
        let neighborSymbol = false;

        for( let c = 0; c < data[r].length; c++ ){
            let char = data[r][c];
            if( isNumber( char ) ){
                curNumbers += char;
                if( hasAdjecentSymbol(data,r,c) ){
                    neighborSymbol = true;
                }
            }else{
                if( neighborSymbol )
                    partNumbers.push( curNumbers )

                curNumbers = '';
                neighborSymbol = false;
            }
        }
        if( curNumbers && neighborSymbol ) 
            partNumbers.push( curNumbers )
    }
    return partNumbers.reduce( (acc,cur) => acc + parseInt(cur), 0);
}

function part2( data ){
    let numbers = [];
    let gears = [];
    for( let r = 0; r < data.length; r++){
        let cords = [];
        let curNumbers = '';
        for( let c = 0; c < data[r].length; c++ ){
            let char = data[r][c];
            if( char === '*') 
                gears.push( {r,c, 'adjacent': []})
            if( isNumber( char ) ){
                curNumbers += char;
                cords.push({r,c})
            }else{
                if( curNumbers )
                    numbers.push( {number: parseInt(curNumbers), cords } );
                cords = [];
                curNumbers = '';
            }
        }
        if( curNumbers ) {
            numbers.push( {number: parseInt(curNumbers), cords } );
            cords = [];
            curNumbers = '';
        }
    }

    let gearRatios = [];
    for( let g of gears ) {
        let adjacent = [];
        for( let n of numbers ) {
            let numIsAdjecent = false;
            for( let c of n.cords ){
                if(Math.abs( g.r - c.r )<=1 && Math.abs(g.c - c.c ) <= 1)
                {
                    numIsAdjecent = true;
                    break;
                }
            }
            if( numIsAdjecent ){
                adjacent.push( n.number );
            }
            if( adjacent.length > 2 ) break;
        }
        if( adjacent.length === 2)
            gearRatios.push( adjacent[0] * adjacent[1]);
    }
    return gearRatios.reduce( (acc,cur) => acc + cur, 0);
}

execute([part1, part2], inputs);

//[0.25ms]	Example	Part1: 4361 
//[5.59ms]	Input	Part1: 527364 
//[0.37ms]	Example	Part2: 467835 
//[27.01ms]	Input	Part2: 79026871 