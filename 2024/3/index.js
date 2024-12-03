import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

function part1( data ){    
    return data.reduce( (acc,cur) => {
        let matches = [...cur.matchAll(/(mul\()([0-9]{1,3})(,)([0-9]{1,3})(\))/g)];
        return acc + matches.reduce( (a,c) => a + ( parseInt(c[2]) * parseInt(c[4])), 0);
    }, 0 );    
}

function part2( data ){
    
    let enabled = true;

    return data.reduce( (acc,cur) => {
        let matches = [...cur.matchAll(/(mul\()([0-9]{1,3})(,)([0-9]{1,3})(\))/g)];
        let dos = [...cur.matchAll(/(do\(\))/g)];
        let donts = [...cur.matchAll(/(don\'t\(\))/g)];
        let all = matches.concat(dos).concat(donts);
        all.sort( (a,b) => a.index - b.index );

        let sum = 0;
        for( let fn of all ){
            if( fn[0] === "do()"){
                enabled = true;
            }else if( fn[0] === `don't()`){
                enabled = false;
            }else{
                sum += enabled ? parseInt(fn[2]) * parseInt(fn[4]) : 0;
            }
        }
        return acc + sum;
    }, 0 );
}

execute([part1, part2], inputs);
// [0.11ms]	Part1	Example: 161 
// [0.20ms]	Part1	Input: 174561379 
// [0.12ms]	Part2	Example: 48 
// [0.29ms]	Part2	Input: 106921067 