import fs from 'fs'
const input = fs.readFileSync('./2022/2/input.txt', 'utf8').split('\r\n').map(row => row.split(' '));
console.log( input );

function calcScore( arr ){
    return calcRound( arr[0], arr[1]);
}
function calcRound( oppenentShape, yourShape )
{
    let shape = 0;
    if( yourShape === 'X' ) shape = 1;
    else if( yourShape === 'Y' ) shape = 2;
    else if( yourShape === 'Z' ) shape = 3;
    
    let outcome = 6;
    if( (oppenentShape === 'A' && yourShape === 'X') || 
        (oppenentShape === 'B' && yourShape === 'Y') ||
        (oppenentShape === 'C' && yourShape === 'Z'))
        outcome = 3;
    else if( (oppenentShape === 'A' && yourShape === 'Z') || 
             (oppenentShape === 'B' && yourShape === 'X') ||
             (oppenentShape === 'C' && yourShape === 'Y'))
        outcome = 0;
    console.log( `[${oppenentShape}, ${yourShape}]: ${shape} + ${outcome} = ${shape+outcome}`)
    return shape + outcome;
    //0 lose, 3 draw, 6 win

    //AX rock
    //BY paper
    //CZ scissors


}
let score = 0;
for( let i = 0; i < input.length; i++ )
{
    score += calcScore( input[i] )
}
console.log( 'score', score );