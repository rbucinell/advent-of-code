import fs from 'fs'
const input = fs.readFileSync('./2022/2/input.txt', 'utf8').split('\r\n').map(row => row.split(' '));

function calcScore( opponent, you )
{
    let shape = 1;
    if( you === 'B' ) shape = 2;
    else if( you === 'C' ) shape = 3;
    
    let outcome = 6;
    if (opponent === you ) outcome = 3;
    else if( (opponent === 'A' && you === 'C') || 
             (opponent === 'B' && you === 'A') ||
             (opponent === 'C' && you === 'B'))
        outcome = 0;
        
    return shape + outcome;
}

function calcRound( opponent, you )
{
    //AX rock, BY paper, CZ scissors
    let shape = 'A';
    if( you === 'Y' ) shape = 'B';
    if( you === 'Z' ) shape = 'C';
    return calcScore( opponent, shape );
}

function calcRoundPart2( opponent, desiredOutcome )
{
    let win = 'Z', lose = 'X', draw = 'Y';
    let you = 'A';

    if( desiredOutcome === win )
    {
        if( opponent === 'A') 
            you = 'B';
        else if( opponent === 'B') 
            you = 'C';
    }
    else if( desiredOutcome === lose){
        if( opponent === 'C' ) 
            you = 'B';
        else if( opponent === 'A') 
            you = 'C';
    }
    else
        you = opponent;

    return calcScore(opponent, you);
}

let score  = input.reduce( (sum, round) => sum + calcRound(...round), 0);
let score2 = input.reduce( (sum, round) => sum + calcRoundPart2(...round), 0);

console.log( 'Part 1 = ', score );  //part 1 = 10994
console.log( 'Part 2 = ', score2 ); //part 2 = 12526