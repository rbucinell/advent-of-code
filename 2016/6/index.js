import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

function part1( data ){
    let modes = [ ...Array(data[0].length) ].map( _ => ( {} ) );
    data.forEach(code => {
        for( let i = 0; i < code.length; i++ )
        {
            let c = code[i];
            if( !modes[i][c] ){
                modes[i][c] = 1;
            }else{
                modes[i][c] = modes[i][c] + 1;
            }
        }
    });
    let code = modes.map( chars => Object.keys(chars).reduce( (a,b) => chars[a] > chars[b] ? a : b)  );
    return code.join('');
}

function part2( data ){
    let modes = [ ...Array(data[0].length) ].map( _ => ( {} ) );
    data.forEach(code => {
        for( let i = 0; i < code.length; i++ )
        {
            let c = code[i];
            if( !modes[i][c] ){
                modes[i][c] = 1;
            }else{
                modes[i][c] = modes[i][c] + 1;
            }
        }
    });
    let code = modes.map( chars => Object.keys(chars).reduce( (a,b) => chars[a] < chars[b] ? a : b)  );
    return code.join('');
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );