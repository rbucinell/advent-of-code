import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

class Report {
    constructor( levels ){
        this.levels = levels;
    }

    isSafe(){
        const sign = (this.levels[0]-this.levels[1])/Math.abs(this.levels[0]-this.levels[1]);

        for( let i = 0; i < this.levels.length-1; i++){
            let diff = this.levels[i]-this.levels[i+1];
            let abs = Math.abs(diff);
            if( sign !== diff/abs || abs < 1 || abs > 3){
                return false;
            }
        }
        return true;
    }


    dampenedSafe(){
        let arr = JSON.parse(JSON.stringify(this.levels));
        let dampUsed = false;
        const sign = (arr[0]-arr[1])/Math.abs(arr[0]-arr[1]);
        
        for( let i = 0; i < arr.length-1; i++){
            let diff = arr[i]-arr[i+1];
            let abs = Math.abs(diff);
            console.log( arr[i], arr[i+1], `[${arr.join(',')}]`, diff, sign !== diff/abs );
            if( sign !== diff/abs || abs < 1 || abs > 3){
                if( dampUsed ){
                    console.log( `Report is safe`)
                    return false;
                }else{
                    dampUsed = true;
                    console.log( `Removing ${arr[i]}`)
                    arr.splice(i,1);
                    console.log( `[${arr.join(',')}]`)
                    i-=2;
                }
            }
        }
        console.log( `Report is safe`)
        return true;
    }
    

}

function part1( data ){
    let reports = data.map( r => new Report( r.split(' ') ));
    return reports.filter( r => r.isSafe() ).length;
}

function part2( data ){
    let reports = data.map( r => new Report( r.split(' ') ));
    return reports.filter( r => r.dampenedSafe() ).length;
    //Answer not 417,437,491
}

execute([part1, part2], inputs);