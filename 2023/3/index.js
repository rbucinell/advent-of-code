import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

const isSymbol = ( s => !'.0123456789'.includes( s ) ); //anything but number and .
const isNumber = ( c => /^\d+$/.test(c) );
  
function numHasNeighborSymbol( r, c, grid ) {

    for( let x = r - 1; x <= r+1; x++ ){
        for( let y = c -1; y <= c+1; y++ ){
            if( x === 0 && y === 0) continue; // checking self, skip
            if( x < 0 || y < 0 ) continue; // off the start of the grid
            if( x> grid.length-1 || y > grid[r].length-1 ) continue; //off end of grid
            if( isSymbol( grid[x][y]) ) return true;
        }
    }
    return false;
}

function part1( data ){

    let numbers = [];
    for( let r = 0; r < data.length; r++) {
        let row = data[r];

        let trackingNumber = false;
        let startNumberIndex = 0;
        let endNumberIndex = 0;
        let numberIsGood = false;

        for( let c = 0; c < row.length; c++ ){
            const char = row[c];
            const charIsNumber = isNumber( char );
            
            if( trackingNumber ){
                endNumberIndex = c;
                if( !charIsNumber || c+1 === row.length ){
                    let num = row.substring(startNumberIndex, endNumberIndex);
                    //console.log( num );

                    numberIsGood = false;
                    for( let i = startNumberIndex; i < endNumberIndex; i++ ){
                        if( numHasNeighborSymbol(r,i,data) ){
                            numberIsGood = true;
                        }
                    }
                    //console.log( num, numberIsGood )
                    if( numberIsGood)
                        numbers.push( parseInt(num) )
                    trackingNumber = false;
                }
            }
            else {
                if( charIsNumber ){
                    startNumberIndex = c;
                    trackingNumber = true;
                }
            }
        }
    }
    return numbers.reduce( (acc,cur) => acc + parseInt(cur), 0);
}

function part2( data ){
    
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );