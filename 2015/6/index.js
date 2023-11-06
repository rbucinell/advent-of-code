import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

const Actions = {
    Toggle: 'toggle',
    Off: 'turn off',
    On: 'turn on'
}

class Instruction {
    constructor( action, startX, startY, endX, endY, desc ){
        this.action = action;
        this.start = {
            x: parseInt(startX),
            y: parseInt(startY)
        }
        this.end = {
            x: parseInt(endX),
            y: parseInt(endY)
        }
        this.desc = desc
    }
}

function newGrid( width, height, initValue = 0 ){
    return [...Array(width)].map(e => Array(height).fill(initValue));
}

function parseData( data ){
    let instructions = [];
    data.forEach(row => {
        row = row.replace('turn on', 'on').replace('turn off', 'off').replace('through ', '');
        let r = row.split(/[\s,]+/)
        let instruction = new Instruction(...r, row);
        instructions.push( instruction );
    });

    return instructions;
    //toggle 753,664 through 970,926
    //turn off 150,300 through 213,740
    //turn on 141,242 through 932,871
}


function part1( data ){
    let instructions = parseData( data );
    let lights = newGrid(1000, 1000 );
    
    instructions.forEach( i => 
    {
        for( let x = i.start.x; x <= i.end.x; x++ )
        {
            for( let y = i.start.y; y <= i.end.y; y++ )
            {
                if( i.action === 'on' ){
                    lights[y][x] = 1;
                }else if( i.action === 'off' ){
                    lights[y][x] = 0;
                }else if( i.action === 'toggle'){
                    if( lights[y][x] === 1 ){
                        lights[y][x] = 0;
                    }else{
                        lights[y][x] = 1;
                    }
                }
            }
        }
    });
    return lights.flat().reduce( (sum,cur) => sum+= cur, 0);

    // for( let i = 0; i < lights.length; i++ )
    // {
    //     for( let j = 0; j < lights[0].length; j++ )
    //     {
    //         sum += lights[i][j];
    //     }
    // }
    // return sum;
}

function part2( data ){
    
}

console.log( "Example Part1:",part1( example ) ); //1991121 too high
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );
