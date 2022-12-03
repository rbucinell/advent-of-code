import fs from 'fs'
const input = fs.readFileSync('./2022/3/input.txt', 'utf8').split('\n');//.map(row => row.split(' '));
const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
console.log(input);

let total = input.reduce( (sum,row) => {
    let match = new Set();
    let pouch1 = row.substring(0, row.length/2)
    let pouch2 = row.substring(row.length/2);
    pouch1.split('').forEach( letter => {
        if( pouch2.indexOf( letter ) !== -1 ) match.add( letter );
    })
    let [key] = match;
    return sum + priorities.indexOf(key)+1;
}, 0);
console.log( total) //part1 8153

let total2 = 0;
for( let i = 0; i < input.length; i+=3)
{
    let r1 = input[i];
    let r2 = input[i+1];
    let r3 = input[i+2];

    let match = new Set();
    r1.split('').forEach( letter => {
        if( r2.indexOf( letter ) !== -1 && r3.indexOf(letter) !== -1 ) match.add( letter );
    });

    let [key] = match;
    total2 += priorities.indexOf(key)+1;


}
console.log(total2);


