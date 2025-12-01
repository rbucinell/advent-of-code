import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

const INITAIL_POSITION = 50;

function part1( data ){
    let position = INITAIL_POSITION;
    let password = 0;
    data.forEach(rotation => {
        let dir = rotation.substring(0,1) === 'R' ? 1 : -1;
        let dist = parseInt(rotation.substring(1));
        
        for( let i = 0; i < dist; i++ ){
            position += dir;
            if( dir > 0 && position === 100 ) position = 0;
            if( dir < 0 && position === -1 ) position = 99; 
        }


        if( position === 0 ){
            password++;
        }
    });

    return password;
}

function part2( data ){
    return 0;
}

//Part1: 1165
execute([part1, part2], inputs);