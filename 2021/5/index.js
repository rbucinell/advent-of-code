const fs = require( 'fs' );
const HydrothermalVent = require('./vent');
const Diagram = require('./diagram');

let input = fs.readFileSync('sample', 'utf8').split('\n');
let vents = [];
input.forEach(element => {
    let vent = HydrothermalVent.parseVent( element );
    vents.push( vent );
});
let diagram = new Diagram( vents );
diagram.display();
console.log( `Part 1 Count: ${ diagram.solvePart1() }`);
console.log( `Part 2 Count: ${ diagram.solvePart2() }`);