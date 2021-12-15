const fs = require( 'fs' );
const HydrothermalVent = require('./vent');
const Diagram = require('./diagram');

let input = fs.readFileSync('sample', 'utf8').split('\n');
let vents = [];
input.forEach(element => {
    let vent = HydrothermalVent.parseVent( element );
    console.log( `vent ${vent}`, vent.points );
    if( vent.x1 === vent.x2 || vent.y1 === vent.y2 )
        vents.push( vent );
});
let diagram = new Diagram( vents );
diagram.display();