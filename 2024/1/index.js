import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

function parseInputs( inputs ) {
    let left = [];
    let right = [];

    for( let i of inputs ){
        let split = i.split(' ');
        let l = split[0];
        let r = split[split.length-1];
        left.push(parseInt(l));
        right.push(parseInt(r));
    }

    left.sort();
    right.sort();


    return {left,right};
}

function part1( data ){
    let {left,right} = parseInputs(data);
    const len = left.length;

    let sum = 0;
    for( let i = 0; i < len; i++ ){
        let l = left.shift();
        let r = right.shift();
        sum += Math.abs( l - r );
    }
    return sum;
}

function part2( data ){
    let {left,right} = parseInputs(data);
    const len = right.length;
    let sum = 0;
    let dict = {};

    for( let i = 0; i < len; i++ ){
        let l = left[i];
        if(!(l in dict)){
            dict[l] = 0;
        }
    }

    for( let i = 0; i < len; i++ ){
        let r = right[i];
        if((r in dict)){
            dict[r] += 1;
        }
    }

    for( let i = 0; i < len; i++ ){
        let l = left[i];
        sum += l * dict[l];
    }

    return sum;
}

execute([part1, part2], inputs);