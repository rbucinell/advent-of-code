import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

function inputToRanges( data:Array<string> ){
    let input:string = data[0];
    let ranges = input.split(',').filter( _ => _).map( s => s.split('-'));
    return ranges;
}

function getAllSubstrings(str:string):string[] {
    const substrings:string[] = [];
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            let newSub = str.slice(i, j);
            if( !substrings.includes(newSub)){
                substrings.push(newSub);
            }
        }
    }
    return substrings.filter( _ => !_.startsWith('0'));
}

function countInvalidInRange( range:string[], invalidator:Function ) {
    const low = parseInt( range[0] );
    const high = parseInt( range[1] );

    let invalid = [];
    for( let i = low; i <= high; i++){
        let str = i.toString();
        let subs = getAllSubstrings(str);
        for(let s of subs){
            if( invalidator(s,str)){
                invalid.push( str );
                break;
            }
        }
    }
    //console.log(`${range} has ${invalid.length === 0 ? 'no' : invalid.length} invalid IDs${invalid.length > 0 ? `, ${invalid.join(',')}`: ''}`);
    return invalid;
}


function part1ValidationTest( seq:string, num:string ):boolean{
    const repeat = `${seq}${seq}`
    return repeat === num;
}

function part2ValidationTest( seq:string, num:string ):boolean{
    let repeat = `${seq}${seq}`;
    do{
        if( repeat === num ) return true;
        repeat += seq;
    }while( repeat.length <= num.length);
    return false;
}


function part1( data:string[] ){
    let ranges = inputToRanges(data);
    return ranges.reduce( (acc,cur) => acc + countInvalidInRange(cur,part1ValidationTest).reduce((a:number,c:string)=> a + parseInt(c), 0), 0);
}

function part2( data:string[] ){
    let ranges = inputToRanges(data);
    return ranges.reduce( (acc,cur) => acc + countInvalidInRange(cur,part2ValidationTest).reduce((a:number,c:string)=> a + parseInt(c), 0), 0);
}

execute([part1, part2], inputs);
// Solved
// [0.68ms]	    Part1	Example: 1227775554 
// [4777.70ms]	Part1	Input: 26255179562 
// [1.43ms]	    Part2	Example: 4174379265 
// [5461.61ms]	Part2	Input: 31680313976 

// First round improvements
// [0.49ms]	    Part1	Example: 1227775554 
// [2191.92ms]	Part1	Input: 26255179562 
// [0.50ms]	    Part2	Example: 4174379265 
// [3012.44ms]	Part2	Input: 31680313976 