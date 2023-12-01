import { dir } from 'console';
import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

const DIR = Object.freeze({
    N:Symbol('N'),
    E:Symbol('E'),
    S:Symbol('S'),
    W:Symbol('W')
});

const move = ( dir ) => {
    switch( dir ){
        case DIR.N: return { x: 0,  y: -1 };
        case DIR.E: return { x: 1,  y: 0  };
        case DIR.S: return { x: 0,  y: 1  };
        case DIR.W: return { x: -1, y: 0  };
    }
}

const turn = ( cur, turning ) => {
    switch( cur ) {
        case DIR.N: return turning === 'R' ? DIR.E : DIR.W;
        case DIR.E: return turning === 'R' ? DIR.S : DIR.N;
        case DIR.S: return turning === 'R' ? DIR.W : DIR.E;
        case DIR.W: return turning === 'R' ? DIR.N : DIR.S;
    }
}

function part1( data ){
    let instructions = data[0].split(', ');
    let position = { x: 0, y: 0 };
    let direction = DIR.N;
    instructions.forEach(instruction => {
        let [turning, ...amount] = instruction;
        amount = parseInt(amount.join(''));
        direction = turn( direction, turning );
        let movement = move(direction);
        position.x += amount * movement.x;
        position.y += amount * movement.y;
    });
    return Math.abs(position.x) + Math.abs(position.y);
}

function part2( data ){
    let instructions = data[0].split(', ');
    let position = { x: 0, y: 0 };
    let direction = DIR.N;
    let path = [];
    for( let i = 0; i < instructions.length; i++ ){
        let instruction = instructions[i];        
        let [turning, ...amount] = instruction;
        amount = parseInt(amount.join(''));
        direction = turn( direction, turning );
        let movement = move(direction);
        for( let a = 0; a < amount; a++ ){
            position.x += movement.x;
            position.y += movement.y;
            let newPos =  {...position};
            if( path.some(pos => pos.x === newPos.x && pos.y === newPos.y)){
                return Math.abs(newPos.x) + Math.abs(newPos.y)
            }
            path.push( newPos )
        }
    }
    return Math.abs(position.x) + Math.abs(position.y);
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );