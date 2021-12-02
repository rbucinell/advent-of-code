const fs = require( 'fs' );


const processLine = function( state, line ) {
    let [direction, quantity] = line.split(' ');
    quantity = parseInt(quantity, 10);
    if( direction === 'down' )
    {
        state.aim += quantity;
    }
    else if( direction === 'up' )
    {
        state.aim -= quantity;        
    }
    else if( direction === 'forward' )
    {
        state.distance += quantity;
        state.depth += state.aim * quantity;
    }
    if( state.depth < 0 ) state.depth = 0;
}

let state =  {
    depth: 0,
    distance: 0,
    aim: 0
};

const input = fs.readFileSync('input', 'utf8').split('\n').map( e => e.trim() );

console.log( input );
input.forEach( line => processLine( state, line ));

console.log( `depth=${state.depth} distance=${state. distance} aim=${ state.aim }`);
console.log( `mult = ${ state.depth * state.distance}`)