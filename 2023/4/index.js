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
        this.matches = [];
        this.numbers.forEach( n => {
            if( this.winners.includes(n)){
                this.matches.push( n );
            }
        });
    }

    winningCopies() {
        let arr = [];
        let len = this.matches.length;
        for( let i = 1; i <= len; i++ ){
            arr.push( this.id + i );
        }
        return arr;
    }

    value() {
        if( this.matches.length === 0) return 0;
        return Math.pow(2, this.matches.length-1);
    }
}

function part1( data ){
    let cards = data.map( dr => new Card( dr ));
    return cards.reduce( (acc,cur) => acc + cur.value(), 0)
}

function part2( data ){
    let cards = data.map( dr => new Card( dr )).reduce( (acc,cur) => {
        acc[cur.id] = cur;
        return acc;
    }, {} );

    let memo = {};
    let winners = Object.keys(cards).map( k => parseInt( k ));
    return countWinners( winners, cards, memo );
}

function countWinners( winners, cards, memo ){
    if( winners.length === 0) return 0;
    let winner = winners.shift();    
    if( !(winner in memo) ){
        let copies = cards[winner].winningCopies();
        memo[winner] = copies.length === 0 ? 1 : countWinners( copies, cards, memo) + 1;
    }
    return memo[winner] + countWinners( winners, cards, memo );
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );

//Example Part1: 13
//Input   Part1: 21088
//Example Part2: 30
//Input   Part2: 6874754