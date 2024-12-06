import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
import { Grid, Node, Orientation } from '../../util/grid.js';
let inputs = build(import.meta.url);

function orienationChar( direction ){
    switch( direction) {
        case Orientation.North:
            return "^";
        case Orientation.East:
            return ">";
        case Orientation.South:
            return "V";
        case Orientation.West:
            return "<";
    }
}


function part1( data ){
    let map = new Grid(data.length, data[0].length, data);
    let out = map.getNode( -1, 0 );
    
    let guard = map.find("^");
    let facing = Orientation.North;
    let next = undefined;

    const locations = new Set();
    locations.add(guard.loc);
    do{
        console.log("***********************");
        next = map.getNeighbor(guard.loc.r, guard.loc.c, facing);
        if( !next ) break;

        if( next.value === "#" ){
            facing = Orientation.turnRight(facing);            
        }else{
            locations.add( guard.loc );
            guard.value = 'X';
            guard = next;
        }
        guard.value = orienationChar(facing);
        console.log(map.display());
    }while(next);
    return locations.size+1;
}

function part2( data ){
    return 0;
}

execute([part1, part2], inputs);