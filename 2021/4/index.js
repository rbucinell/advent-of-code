const fs = require( 'fs' );
const BingoBoard = require('./bingoboard.js');
let input = fs.readFileSync('input', 'utf8').split('\n');

let drawings = input[0].split(',');
let boards = [];
let row = 2;
while( row < input.length)
{
    let curBoard = [];
    for( let i = 0; i < 5; i++ )
    {
        curBoard.push(input[row++].trim().split(' ').filter( e => e !== null && e !== ''));
    }
    boards.push( new BingoBoard(curBoard));
    row++;
}

for( let i = 0; i < drawings.length; i++ )
{
    let num = drawings[i];
    boards.forEach( b => b.add( num ) );
    let winner = boards.find( b => b.hasWon() ); 
    if( winner )
    {
        let score = winner.calcuate();
        console.log( `Board ${i} won with a score of: ${winner.calcuate()}`);
        console.log( `${score} x ${num} = ${score * num}` )
        break;
    }
}