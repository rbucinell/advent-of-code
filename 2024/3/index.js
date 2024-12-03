import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

function part1( data ){
    
    return data.reduce( (acc,cur) =>{
        let matches = [...cur.matchAll(/(mul\()([0-9]{1,3})(,)([0-9]{1,3})(\))/g)];
        return acc + matches.reduce( (a,c) => a + ( parseInt(c[2]) * parseInt(c[4])), 0);
    }, 0 );
    
}

function part2( data ){
    return 0;
}

execute([part1, part2], inputs);
//[0.10ms]	Part1	Example: 161 
//[0.20ms]	Part1	Input: 174561379 