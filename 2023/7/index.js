import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

let FACES = 'A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2'.replaceAll(' ', '').split(',');
const WIN_TYPE = Object.freeze({
    HIGH_CARD:  1,
    ONE_PAIR:  2,
    TWO_PAIR: 3,
    THREE_OF_a_KIND: 4,
    FULL_HOUSE: 5,
    FOUR_OF_a_KIND:  6,
    FIVE_OF_a_KIND:  7
});

class Card {
    constructor( hand, bid ){
        this.hand = hand;
        this.bid = parseInt(bid);
        this.winType = this.eval();
        this.winWithWilds = this.eval2();
    }


    eval(){
        let dict = {};
        for( let h of this.hand ){
            dict[h] = h in dict ? dict[h]+1 : 1;
        }
        let vals = Object.values(dict);
        vals.sort( (a,b) => b-a);
        return this.#getWin(vals);
    }

    eval2(){

        let dict = {};
        let wilds = 0;
        for( let h of this.hand ){
            if( h !== 'J') {
                dict[h] = h in dict ? dict[h]+1 : 1;
            }else{
                wilds++;
            }
        }
        if( wilds === 5) return WIN_TYPE.FIVE_OF_a_KIND;
        let vals = Object.values(dict);
        vals.sort( (a,b) => b-a);
        vals[0] += wilds;
        return this.#getWin(vals);

    }

    #getWin( vals ){
        let uniqueCount = vals.length;
        if( uniqueCount === 5 ) return WIN_TYPE.HIGH_CARD;
        if( uniqueCount === 4 ) return WIN_TYPE.ONE_PAIR;
        if( uniqueCount === 1 ) return WIN_TYPE.FIVE_OF_a_KIND;
        if( uniqueCount === 2 ) 
            return vals[0] === 4 ? WIN_TYPE.FOUR_OF_a_KIND : WIN_TYPE.FULL_HOUSE;
        return vals[0] == 3 ?WIN_TYPE.THREE_OF_a_KIND: WIN_TYPE.TWO_PAIR;
    }

    compareTo( other){
        if( this.winType < other.winType ) return -1;
        if( this.winType > other.winType ) return 1;
        if( this.winType === other.winType ) {
            for( let i = 0; i < this.hand.length; i++ )
            {
                if( this.hand[i] === other.hand[i] ) continue;
                return FACES.indexOf( this.hand[i] ) > FACES.indexOf( other.hand[i] ) ? -1 : 1;
            }
        }
        return 0;
    }

    compareTo2( other){
        if( this.winWithWilds < other.winWithWilds ) return -1;
        if( this.winWithWilds > other.winWithWilds ) return 1;
        if( this.winWithWilds === other.winWithWilds ) {
            for( let i = 0; i < this.hand.length; i++ )
            {
                if( this.hand[i] === other.hand[i] ) continue;
                return FACES.indexOf( this.hand[i] ) > FACES.indexOf( other.hand[i] ) ? -1 : 1;
            }
        }
        return 0;
    }

    toString()
    {
        return `${this.hand}\t${this.bid}\t${Object.keys(WIN_TYPE)[this.winType]}`;
    }
}
function part1( data ){

    let cards = data.map( d => new Card( ...d.split(' ')));
    cards.sort( (a,b) => a.compareTo(b) );
    return cards.reduce( (acc,cur, i) => acc + (cur.bid * (i+1) ), 0 );
}

function part2( data ){
    FACES = FACES.filter( f => f !== 'J' );
    FACES.push( 'J' );
    let cards = data.map( d => new Card( ...d.split(' ')));
    cards.sort( (a,b) => a.compareTo2(b) );
    return cards.reduce( (acc,cur, i) => acc + (cur.bid * (i+1) ), 0 );
}

execute([part1, part2], inputs, false);

//[0.17ms]	Example	Part1: 6440 
//[3.85ms]	Input	Part1: 248113761 
//[0.19ms]	Example	Part2: 5905 
//[2.97ms]	Input	Part2: 246285222 
