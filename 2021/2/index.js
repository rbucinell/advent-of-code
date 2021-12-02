const fs = require( 'fs' );


const processLine = function( line ) {
    let [direction, quantity] = line.split(' ');
    quantity = parseInt(quantity, 10);
    let adjustments = [ 0, 0 ];
    if( direction === 'down' )
    {
        adjustments[0] += quantity;
    }
    else if( direction === 'up' )
    {
        adjustments[0] -= quantity;        
    }
    else if( direction === 'forward' )
    {
        adjustments[1] += quantity;
    }
    return adjustments;
}

let depth = 0;
let distance = 0;

const input = fs.readFileSync('input', 'utf8').split('\n').map( e => e.trim() );

console.log( input );
input.forEach( line => {
    let adj = processLine( line );
    depth += adj[0];
    if( depth < 0 ) depth = 0;
    distance += adj[1];
} );

console.log( `depth=${depth} distance=${distance} mult=${ depth * distance}`);