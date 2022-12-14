import fs from 'fs';
import {download} from './input.js'

let [year, day] = process.argv.slice(2);
if( !year ) {
    console.log(`Need year Paramter`);
    process.exit();
}
if( !day ) {
    console.log(`Need day paramter`);
    process.exit();
}

if( !fs.existsSync(`./${year}/${day}`)) 
    fs.mkdirSync(`./${year}/${day}`);
fs.writeFileSync(`./${year}/${day}/README.md`, '');
fs.writeFileSync(`./${year}/${day}/example.txt`, '');
let inputData = await download(year,day);

fs.writeFileSync(`./${year}/${day}/input.txt`, inputData);
fs.writeFileSync(`./${year}/${day}/index.js`, `import {read} from '../../util/input.js'
let [example,input] = ['example','input'].map( i => read( ${year}, ${day}, i ));
console.log( example );

function part1( data ){
    
}

function part2( data ){
    
}

console.log( "Example Part1:",part1( example ) );
console.log( "Example Part1:",part1( input ) );

console.log( "Example Part1:",part2( example ) );
console.log( "Example Part1:",part2( input ) );
`);