import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

class Card {
    constructor( inputStr ){
        let colonIndex = inputStr.indexOf(':');
        this.id = parseInt(inputStr.substring(4, colonIndex).trim());
        let [wins, nums] = inputStr.substring(colonIndex+1)
                            .split('|')
                            .map( l => l.split(' ')
                                            .filter( e => e !== '')
                                            .map( n => parseInt(n)
                                        )
                            );

        this.winners = wins;
        this.numbers = nums;



    }

    value() {
        let val = 0;
        this.numbers.forEach( n => {
            if( this.winners.includes(n) ){
                val = val === 0 ? 1 : val * 2;
            }
        });
        return val;
    }
}


function part1( data ){
    let cards = data.map( dr => new Card( dr ));
    return cards.reduce( (acc,cur) => acc + cur.value(), 0)
}

function part2( data ){
    
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );