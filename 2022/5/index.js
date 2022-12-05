import fs from 'fs'
const input = fs.readFileSync('./2022/5/input.txt', 'utf8').split('\r\n');//.map(row => row.split(' '));

//find the break
let breakIndex = 0;
while(input[breakIndex].length !== 0 ) breakIndex++;
let columns = input[breakIndex-1].split(' ').filter( v => v!== '').length;
//populate stacks
let stacks = Array.from({length: columns}, ()=> []);
for( let r = breakIndex-2; r >= 0; r--)
{
    let row = input[r];
    let contents = []
    for( let c = 1; c < row.length; c+=4)
    {
        contents.push( row[c] );
    }
    for( let i = 0; i < contents.length;i++)
    {
        if( contents[i] !== ' ' ) stacks[i].push(contents[i]);
    }
}

function parseInstruction( instruction )
{
    let fromIndex = instruction.indexOf('from');
    let toIndex = instruction.indexOf('to');
    //move 1 from 2 to 1
    let move = parseInt(instruction.substr(4,3).trim());
    let from = parseInt(instruction.substr(fromIndex+4,3).trim());
    let to = parseInt(instruction.substr(toIndex+2,3).trim());
    return [move,from, to];
}

function doInstruction( move, from, to )
{
    for( let i = 0; i < move; i++)
    {
        stacks[to-1].push(stacks[from-1].pop());
    }
}

//do instructions
for( let i = breakIndex+1; i < input.length; i++)
{
    doInstruction( ...parseInstruction( input[i] ) );
}
let output = '';
stacks.forEach( stack => output += stack[stack.length-1]);
console.log( output ); //part 1 solve: GFTNRBZPF
