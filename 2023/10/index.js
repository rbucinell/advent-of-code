import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
import {Grid, Node, Loc} from '../../util/grid.js';
let inputs = build(import.meta.url, ['simple', 'example','6820-337','3022-0','7012-_','input']);

class TileGrid extends Grid{
    getPipeNeighbors(node){
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
                    let neighborOfNeighbors = this.getPipeNeighbors(node);
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
        let neighbors = grid.getPipeNeighbors(cur);
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

function part2( data ){

    //create a buffer empty space:
    const newR = '.'.repeat(data[0].length);
    data.unshift(newR);
    data.push(newR);
    data = data.map( row => `.${row}.`);
    let grid = new TileGrid(data.length, data[0].length, data.map( row => row.split('')));
    
    ////////////////PART 1 Modifies ///////////////
    let start = grid.find('S');
    //bfs approach
    let visited = [];
    start.dist = 0;
    start.isFilled = true;
    let queue = [start];
    let dist = start.dist;
    while( queue.length > 0 )
    {
        let cur = queue.shift();
        visited.push( cur );
        let neighbors = grid.getPipeNeighbors(cur);
        for( let neighbor of neighbors ) {
            if( !('dist' in neighbor)) {
                neighbor.dist = cur.dist + 1;
                neighbor.isFilled = true;
                dist = Math.max( dist, neighbor.dist );
            }
            if( !visited.includes( neighbor ) )
            {
                queue.push( neighbor );
            }
        }
    }
    ////////////////

    //860 too high
    ////Part2 floodfill
    queue = [grid.getNode(0,0)];
    while( queue.length > 0 )
    {
        let cur = queue.shift();
        cur.dist = 'O';
        cur.isFilled = true;
        let neighbors = grid.getNeighbors(cur.loc.r,cur.loc.c).map( loc => grid.getNode(loc.r,loc.c));
        neighbors = neighbors.filter( n => !('dist' in n));
        queue.unshift(...neighbors);
    }
    let nonFilled = grid.nodes.flat().reduce( (acc,cur) => acc + ( cur.isFilled ? 0 : 1), 0)
    console.log( nonFilled );
    return grid.nodes.reduce( (acc,row) => acc + row.reduce( (sub,cur) => sub + (cur.hasOwnProperty('dist')?0:1),0),0)

}

execute([part1, part2], inputs);
//[65.50ms]	Part1	Input: 6738 
