import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

function HASH( str )
{
    let cur = 0;
    for( let char in str ){
        let val = str.charCodeAt(char);
        cur+= val;
        cur *= 17;
        cur = cur % 256;
    }
    return cur;
}

function part1( data ){
    data = data.join('').split(',');
    return data.reduce( (acc, line) => acc + HASH(line), 0 );
}

function part2( data ){
    return 0;
}

execute([part1, part2], inputs);