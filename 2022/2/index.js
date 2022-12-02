import fs from 'fs'
const input = fs.readFileSync('./2022/2/input.txt', 'utf8').split('\r\n').map(row => row.split(' '));
console.log( input );


function calcScore( oppenentShape, yourShape )
{
    let shape = 0;
    if( yourShape === 'A' ) shape = 1;
    else if( yourShape === 'B' ) shape = 2;
    else if( yourShape === 'C' ) shape = 3;
    
    let outcome = 6;
    if( (oppenentShape === 'A' && yourShape === 'A') || 
        (oppenentShape === 'B' && yourShape === 'B') ||
        (oppenentShape === 'C' && yourShape === 'C'))
        outcome = 3;
    else if( (oppenentShape === 'A' && yourShape === 'C') || 
             (oppenentShape === 'B' && yourShape === 'A') ||
             (oppenentShape === 'C' && yourShape === 'B'))
        outcome = 0;
    //console.log( `[${oppenentShape}, ${yourShape}]: ${shape} + ${outcome} = ${shape+outcome}`)
    return shape + outcome;
    //0 lose, 3 draw, 6 win
}

function calcRound( oppenentShape, yourShape )
{
    let shape = 'A';
    if( yourShape === 'Y' ) shape = 'B';
    if( yourShape === 'Z' ) shape = 'C';
    return calcScore( oppenentShape, shape );
    //AX rock
    //BY paper
    //CZ scissors
}

function calcRoundPart2( oppenentShape, desiredOutcome )
{
    let win = 'Z', lose = 'X', draw = 'Y';
    let yourShape = 'A';

    if( desiredOutcome === win )
    {
        if( oppenentShape === 'A') yourShape = 'B';
        else if( oppenentShape === 'B') yourShape = 'C';
    }
    else if( desiredOutcome === lose){
        if( oppenentShape === 'C' ) yourShape = 'B';
        else if( oppenentShape === 'A') yourShape = 'C';
    }
    else
        yourShape = oppenentShape;
    
    return calcScore(oppenentShape, yourShape);




    


}


let score = 0;
let p2score = 0;
for( let i = 0; i < input.length; i++ )
{
    score += calcRound( input[i][0], input[i][1] ); 
    p2score += calcRoundPart2( input[i][0], input[i][1] );
}
console.log( 'score', score ); //part 1 = 10994
console.log( 'p2score', p2score ); //part 2 = 12526