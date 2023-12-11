import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
import {Grid, Node, Loc} from '../../util/grid.js';
let inputs = build(import.meta.url);

class TileGrid extends Grid{
    getNeighbors(loc){
        let pipe = super.getNeighbors(loc);
        switch( pipe ){
            case '|': neighbors.filter( n => [ new Loc(this.r-1, this.c), new Loc(this.r+1, this.c) ].includes(n) );break;
            case '-': neighbors.filter( n => [ new Loc(this.r, this.c-1), new Loc(this.r, this.c+1) ].includes(n) );break;
            case 'L': neighbors.filter( n => [ new Loc(this.r-1, this.c), new Loc(this.r, this.c+1) ].includes(n) );break;
            case 'J': neighbors.filter( n => [ new Loc(this.r-1, this.c), new Loc(this.r, this.c-1) ].includes(n) );break;
            case '7': neighbors.filter( n => [ new Loc(this.r+1, this.c), new Loc(this.r, this.c-1) ].includes(n) );break;
            case 'F': neighbors.filter( n => [ new Loc(this.r+1, this.c), new Loc(this.r, this.c+1) ].includes(n) );break;
            default: neighbors = []
        }
    }

    equals( other ){ return this.pipe === other.pipe && this.loc.equals(other.loc) }
}


function part1( data ){
    let grid = new TileGrid(data.length, data[0].length, data.map( row => row.split('')));
    let start = grid.find('S');

    let visited = [];
    let queue = [start];
    let dist = 0;
    while( queue.length > 0 )
    {
        let cur = queue.shift();
        visited.push( cur );
        dist++;
        let neighbors = grid.getNeighbors(cur.loc);
        queue.unshift( ...neighbors );
    }


    return dist;
}

function part2( data ){
    return 0;
}

execute([part1, part2], inputs);