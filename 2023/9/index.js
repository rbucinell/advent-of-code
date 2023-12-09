import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

class Sequence {
    constructor( line ){
        this.history = [ line.split(' ').map( c => parseInt(c)) ];
        while( !this.history[ this.history.length - 1].every( e => e=== 0))
        {
            let curHist = this.history[ this.history.length - 1];
            let newHist = [];
            for( let i = 0; i < curHist.length-1; i++ ){
                newHist.push( curHist[i+1] - curHist[i] );
            }
            this.history.push( newHist );
        }
    }

    extrapolate(){
        let prev = 0;
        for( let h = this.history.length - 2; h >= 0; h--){
            let curHist = this.history[h];
            let last = curHist[curHist.length-1];
            prev += last;   
        }
        return prev;
    }

    beginingExtrapolate(){
        let prev = 0;
        for( let h = this.history.length - 2; h >= 0; h--){
            let curHist = this.history[h];
            let last = curHist[0];
            prev = last - prev;   
        }
        return prev;
    }
}


function part1( data ){
    let sequences = data.map( d => new Sequence(d) );
    return sequences.reduce( (acc,cur) => acc + cur.extrapolate(), 0 );
}

function part2( data ){
    let sequences = data.map( d => new Sequence(d) );
    return sequences.reduce( (acc,cur) => acc + cur.beginingExtrapolate(), 0 );
}

execute([part1, part2], inputs);
//[0.11ms]	Example	Part1: 114 
//[2.27ms]	Input	Part1: 2005352194 
//[0.11ms]	Example	Part2: 2 
//[2.64ms]	Input	Part2: 1077 
