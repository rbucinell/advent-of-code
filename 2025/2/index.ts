import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);



function inputToRanges( data:Array<string> ){
    let input:string = data[0];
    let ranges = input.split(',').filter( _ => _).map( s => s.split('-'));
    return ranges;
}

function getAllSubstrings(str:string):string[] {
    const substrings = [];
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            substrings.push(str.slice(i, j));
        }
    }
    return substrings.filter( _ => !_.startsWith('0'));
}

function countInvalidInRange( range:string[] ) {
    const low = parseInt( range[0] );
    const high = parseInt( range[1] );

    const memo:Record<string,any> = {};

    let invalid = [];
    for( let i = low; i <= high; i++){
        let str = i.toString();
        if( str in memo ){
            invalid = memo[str];
        }else {
            if( str.startsWith("0") ){
                continue;
            }
            let subs = [...new Set(getAllSubstrings(str))];
            for(let s of subs){
                let repeat = s+''+s;
                //console.log( subs, str, repeat, str === repeat)
                if( str === repeat){
                    memo[str] = true;
                    invalid.push( str );
                    break;
                }
            }
        }
    }
    //console.log(`${range} has ${invalid.length === 0 ? 'no' : invalid.length} invalid IDs${invalid.length > 0 ? `, ${invalid.join(',')}`: ''}`);
    return invalid;
}

function part1( data:string[] ){
    let ranges = inputToRanges(data);
    return ranges.reduce( (acc,cur) => acc + countInvalidInRange(cur).reduce((a:number,c:string)=> a + parseInt(c), 0), 0);
}

function part2( data:string[] ){
    let ranges = inputToRanges(data);
    return 0;
}

execute([part1, part2], inputs);
// [0.65ms] 	Part1	Example: 1227775554 
// [4503.57ms]	Part1	Input: 26255179562 