import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
import {Grid, Node, Loc} from '../../util/grid.js';
let inputs = build(import.meta.url, ['simple', 'example','6820-337','3022-0','7012-_','input']);

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
            case 'S': 
                restrictions = neighbors.filter( neighbor => {
                    let node = this.getNode(neighbor.r, neighbor.c);
                    let neighborOfNeighbors = this.getNeighbors(node);
                    return neighborOfNeighbors.some( non => non.value === 'S');
                });
                break;
            default: restrictions = [];  break;
        }
        //Now filter on the problem specific restrictions
        neighbors = neighbors.filter( n => restrictions.some( r => n.equals(r) ) );
        neighbors = neighbors.map( neighbor => this.getNode( neighbor.r, neighbor.c));
        neighbors = neighbors.filter( n => n.value !== '.' );
        return neighbors; 
    }

    displayWindow( r, c ){
        console.log( '         ');
        for( let i = -1; i <= 1; i++ ){
            let row = [];
            for( let j = -1; j<= 1; j++ ){
                let outsym = ' ';
                try{
                    outsym = this.getNode(r+i, c+j).value;
                }catch{ outsym = 'X'};
                row.push( ` ${outsym} ` );
            }
            console.log( row.join('') );
        }
        console.log('---------')
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
    //bfs approach
    let visited = [];
    start.dist = 0;
    let queue = [start];
    let dist = start.dist;
    while( queue.length > 0 )
    {
        let cur = queue.shift();
        //grid.displayWindow(cur.loc.r, cur.loc.c);
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

function floodfill( grid ){
    let queue = [ grid.getNode(0,0), grid.getNode(0,grid.cols-1), grid.getNode(grid.rows-1,0), grid.getNode(grid.rows-1, grid.cols-1)]
    while( queue.length > 0){
        let cur = queue.shift();
        if( !('dist' in cur )){
            cur.dist = 'O';
        }
        for( let i = -1; i <= 1; i++){
            for( let j = -1; j <= 1; j++){
                if( i >= 0 && i < grid.rows-1 && j>= 0 && j < grid.cols-1){
                    let newLoc = cur.loc.to(i,j);
                    let n = grid.getNode(newLoc.r,newLoc.c);
                    if( n && n.value === '.' && n.dist != 'O'){
                        queue.push(n);
                    }
                }
            }
        }
    }

    let count = 0;
    for( let r of grid.nodes){
        for( let c of r){
            if( c.dist === 'O') count++;
        }
    }
    return count;
}


function part2( data ){
    let grid = new TileGrid(data.length, data[0].length, data.map( row => row.split('')));
    let start = grid.find('S');
    let visited = [];
    start.dist = 0;
    let queue = [start];
    let dist = start.dist;
    while( queue.length > 0 )
    {
        let cur = queue.shift();
        //grid.displayWindow(cur.loc.r, cur.loc.c);
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

    return floodfill( grid )
}

execute([part1, part2], inputs);