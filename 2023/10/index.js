import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
import {Grid, Node, Loc} from '../../util/grid.js';
let inputs = build(import.meta.url, ['simple', 'example','6820-337','3022-0','7012-_','input']);// ['3022-0', 'input']);

class TileGrid extends Grid{
    getNeighbors(node){
        //call to get generic valid neighbors
        let { loc, value } = node;
        let neighbors = super.getNeighbors(loc.r,loc.c);
        let restrictions = [];
        switch( value ){
            case '|': restrictions = [ loc.to(-1,0), loc.to(1,0) ];break;
            case '-': restrictions = [ loc.to(0,-1), loc.to(0,1) ];break;
            case 'L': restrictions = [ loc.to(-1,0), loc.to(0,1) ];break;
            case 'J': restrictions = [ loc.to(-1,0), loc.to(0,-1)];break;
            case '7': restrictions = [ loc.to(1,0),  loc.to(0,-1)];break;
            case 'F': restrictions = [ loc.to(1,0),  loc.to(0,1) ];break;
            case 'S': restrictions = neighbors; break;
            default: restrictions = [];  break;
        }
        //Now filter on the problem specific restrictions
        neighbors = neighbors.filter( n => restrictions.some( r => n.equals(r) ) );
        return neighbors.map( neighbor => this.getNode( neighbor.r, neighbor.c));
    }

    display(){
        for( let r of this.nodes){
            let row = [];
            for( let c of r){
                let display = '.';
                if( 'dist' in c ){
                    // switch( c.value ){
                    //     case '|': display = '│'; break;
                    //     case '-': display = '─'; break;
                    //     case 'L': display = '└'; break;
                    //     case 'J': display = '┙'; break;
                    //     case '7': display = '┑'; break;
                    //     case 'F': display = '┍'; break;
                    //     case 'S': display = '┿'; break;
                    //     default: display = '☐';
                    // }
                    display = c.dist;
                }
                row.push ( display )
            }
            console.log( row.join(','));
        }
    }
}


function part1( data ){
    let grid = new TileGrid(data.length, data[0].length, data.map( row => row.split('')));
    let start = grid.find('S');

    let visited = [];
    start.dist = 0;
    let queue = [start];
    let dist = start.dist;
    while( queue.length > 0 )
    {
        let cur = queue.shift();
        visited.push( cur );
        let neighbors = grid.getNeighbors(cur);
        for( let neighbor of neighbors ) {
            if( !('dist' in neighbor)) {
                neighbor.dist = cur.dist + 1;
                dist = Math.max( dist, neighbor.dist );
            }
            if( !visited.includes( neighbor ) )
            {
                queue.push( neighbor );
            }
        }
    }

    //grid.display();
    return dist;//Math.max(...visited.map( v => v.dist));
}
//6735 too low
function part2( data ){
    return 0;
}

execute([part1, part2], inputs);