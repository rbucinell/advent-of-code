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
fs.writeFileSync(`./${year}/${day}/input.txt`, await download(year,day));
fs.copyFileSync( './util/template.js', `./${year}/${day}/index.js`);