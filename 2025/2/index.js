import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

function inputToRanges( data ){
    data = data[0];
    let ranges = data.split(',').map( s => s.split('-').map( e => parseInt(e)))
    return ranges;
}

function countInvalidInRange( range ) {
    const low = range[0];
    const high = range[1];

    let invalid = 0;
    let re = /(.)_.*\1/g;
    for( let i = low; i <= high; i++){
        let str = i + '';
        console.log( `[${i}] ${re.test(str)}`);
        let matches =  ((str || '').match(re) || []).length;
        console.log( matches.length);
        invalid += re.test(str) ? 1 : 0;
        
        






    }

    return invalid;
}

function part1( data ){
    let ranges = inputToRanges(data);
    return ranges.reduce( (acc,cur) => acc + countInvalidInRange(cur), 0);
}

function part2( data ){
    let ranges = inputToRanges(data);
    return 0;
}

execute([part1, part2], inputs);