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

    isArrSafe( arr, dampened = false ){
        let isSafe = true;
        let dampUsed = dampened;
        const sign = (arr[0]-arr[1])/Math.abs(arr[0]-arr[1]);
        
        for( let i = 0; i < arr.length-1; i++){
            let diff = arr[i]-arr[i+1];
            let abs = Math.abs(diff);
            //console.log( arr[i], arr[i+1], `[${arr.join(',')}]`, diff, sign !== diff/abs );
            if( sign !== diff/abs || abs < 1 || abs > 3){
                if( dampUsed ){
                    //console.log( `Report is safe`)
                    isSafe = false;
                    break;
                }else{
                    dampUsed = true;
                    //console.log( `Removing ${arr[i]}`)
                    arr.splice(i,1);
                    //console.log( `[${arr.join(',')}]`)
                    i-=2;
                }
            }
        }
        //console.log( `Report is safe`)
        return isSafe;
    }

    dampenedSafe(){

        let arr = JSON.parse( JSON.stringify(this.levels) ).map( _ => parseInt( _ ));
        if( this.isArrSafe(arr)) return true;

        for( let i = 0; i < this.levels.length; i++ ) {
            arr = JSON.parse( JSON.stringify(this.levels) ).map( _ => parseInt( _ ));
            arr.splice( i, 1 );
            if( this.isArrSafe( arr, true )) return true;
        }
        return false;
    }
}

function part1( data ){
    let reports = data.map( r => new Report( r.split(' ').map( r => parseInt(r)) ));
    return reports.filter( r => r.isSafe() ).length;
}

function part2( data ){
    let reports = data.map( r => new Report( r.split(' ').map( r => parseInt(r)) ));
    return reports.filter( r => r.dampenedSafe() ).length;
}

/*
[0.17ms]	Part1	Example: 2
[1.35ms]	Part1	Input: 407
[0.20ms]	Part2	Example: 4
[6.13ms]	Part2	Input: 459
*/

execute([part1, part2], inputs);