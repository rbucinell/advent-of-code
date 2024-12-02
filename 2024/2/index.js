import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

class Report {
    constructor( levels ){
        this.levels = levels;
    }

    isSafe(){
        let sign = (this.levels[0]-this.levels[1])/Math.abs(this.levels[0]-this.levels[1]);

        for( let i = 0; i < this.levels.length-1; i++){
            let diff = this.levels[i]-this.levels[i+1];
            let abs = Math.abs(diff);
            if( sign !== diff/abs || abs < 1 || abs > 3){
                return false;
            }
        }
        return true;
    }
}

function part1( data ){
    let reports = data.map( r => new Report( r.split(' ') ));
    return reports.filter( r => r.isSafe() ).length;
}

function part2( data ){
    return 0;
}

execute([part1, part2], inputs);