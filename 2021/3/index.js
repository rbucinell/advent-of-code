const fs = require( 'fs' );
const multiBinStr = ( a, b ) => parseInt(a,2) * parseInt(b,2);

const mostCommonAtBitPosition = ( input, col, tie = '1' ) => {
    let count1 = 0, count0 = 0;
    input.forEach(element => element[col] === '1' ? count1++ : count0++);
    return count1 === count0 ? tie : (count1>count0) ? '1':'0';
}

const leastCommonAtBitPosition = ( input, col, tie = '0' ) => {
    let count1 = 0, count0 = 0;
    input.forEach(element => element[col] === '1' ? count1++ : count0++);
    return count1 === count0 ? tie : (count1<count0) ? '1':'0';
}

const calculateGamma = function( input ) {
    let gammaStr = "";
    for( let col = 0; col < input[0].length; col++) {
        gammaStr += mostCommonAtBitPosition(input, col);
    }    
    return gammaStr;
}

const calculateEpsilon = function( input ) {
    let gamma = calculateGamma(input);
    return gamma.split('').map( e => e === '1'? '0': '1').join('');
}

const oxygenGeneratorRating = function( i )
{
    let input = [...i]; // copy
    for( let col = 0; col < input[0].length; col++  )
    {
        let m = mostCommonAtBitPosition(input, col);
        input = input.filter( predicate => predicate[col] === m );
    }
    return input[0].join('');
}

const co2ScrubberRating = function( i )
{
    let input = [...i]; // copy
    for( let col = 0; col < input[0].length; col++  )
    {
        let m = leastCommonAtBitPosition(input, col);
        input = input.filter( predicate => predicate[col] === m );
        if( input.length === 1 ) break;
    }
    return input[0].join('');
}

const input = fs.readFileSync('input', 'utf8').split('\n').map( e => e.trim().split('') );
let gamma    = calculateGamma( input );
let epsilon  = calculateEpsilon( input );
let oxygen   = oxygenGeneratorRating( input );
let co2      = co2ScrubberRating(input);

console.log( `γ= ${gamma} ε= ${epsilon} power= ${multiBinStr(gamma,epsilon)}`);
console.log( `O=${oxygen} CO2=${co2} Life Support Rating = ${multiBinStr(oxygen,co2)}`);
