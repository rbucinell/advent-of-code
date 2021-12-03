const fs = require( 'fs' );
const powerConsumption = ( gamma, epsilon ) => parseInt(gamma,2) * parseInt(epsilon,2);

const calculateGamma = function( input ) {
    let gammaStr = "";
    console.log( input)
    for( let col = 0; col < input[0].length; col++) {
        let count1 = 0, count0 = 0;
        input.forEach(element => element[col] === '1' ? count1++ : count0++);
        gammaStr += ( count1 > count0 ) ? '1' : '0';
    }    
    return gammaStr;
}

const calculateEpsilon = function( input ) {
    let gamma = calculateGamma(input);
    return gamma.split('').map( e => e === '1'? '0': '1').join('');
}

const input = fs.readFileSync('input', 'utf8').split('\n').map( e => e.trim().split('') );
let gamma = calculateGamma( input );
let epsilon = calculateEpsilon( input );
console.log(parseInt(gamma,2) ,parseInt(epsilon,2) )
console.log( `γ= ${gamma} ε= ${epsilon} power= ${powerConsumption(gamma,epsilon)}`);

