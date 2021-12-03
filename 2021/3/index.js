const fs = require( 'fs' );
const powerConsumption = ( gamma, epsilon ) => parseInt(gamma,2) * parseInt(epsilon,2);
const lifeSupportRating = ( oxygenGen, co2scrub ) => oxygenGen * co2scrub;

const mostCommonAtBitPosition = ( input, col ) => {
    let count1 = 0, count0 = 0;
    input.forEach(element => element[col] === '1' ? count1++ : count0++);
    return ( count1 > count0 ) ? '1' : '0';
}

const calculateGamma = function( input ) {
    let gammaStr = "";
    console.log( input)
    for( let col = 0; col < input[0].length; col++) {
        gammaStr += mostCommonAtBitPosition(input, col);
    }    
    return gammaStr;
}

const calculateEpsilon = function( input ) {
    let gamma = calculateGamma(input);
    return gamma.split('').map( e => e === '1'? '0': '1').join('');
}

const input = fs.readFileSync('sample', 'utf8').split('\n').map( e => e.trim().split('') );
let gamma = calculateGamma( input );
let epsilon = calculateEpsilon( input );

let oxygen = 0, co2 = 0;

console.log(parseInt(gamma,2) ,parseInt(epsilon,2) )
console.log( `γ= ${gamma} ε= ${epsilon} power= ${powerConsumption(gamma,epsilon)}`);
console.log( `Life Support Rating = ${lifeSupportRating(oxygen,co2)}`)
