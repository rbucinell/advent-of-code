const fs = require( 'fs' );
const HydrothermalVent = require('./vent');
const Diagram = require('./diagram');

let input = fs.readFileSync('input', 'utf8').split('\n');
let vents = [];
input.forEach(element => {
    let vent = HydrothermalVent.parseVent( element );
    if( vent.x1 === vent.x2 || vent.y1 === vent.y2 )
        vents.push( vent );
});
let diagram = new Diagram( vents );
diagram.display();
console.log( `Part 1 Count: ${ diagram.solvePart1() }`);