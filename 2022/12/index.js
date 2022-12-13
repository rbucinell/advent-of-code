import { PriorityQueue} from './priority.js'
import {read} from '../../util/input.js'
let [example,input, input2] = ['example','input', 'input2'].map( i => read( 2022, 12, i ));
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

class Square{
    constructor( letter, r,c){
        this.letter = letter;
        this.r = r;
        this.c = c;
        this.neighbors = [];
        this.g = 0;
        this.prev= null;
        this.visited = false;
        let cur = this.letter;
        if( cur === 'S') cur = 'a';
        if( cur === 'E') cur = 'z';
        this.h = alphabet.indexOf(cur);
    }
    get f() {
        return this.g + 1;
    }
    clearCalc()
    {
        this.h = 0;
        this.g = 0;
    }

    visit()
    {
        this.visited = true;
    }
}


function buildMap( data )
{
    let map ={
        start: { },
        end: { },
        grid: []
    };
    data = data.map( row => row.split(''));
    for( let r = 0; r < data.length; r++)
    {
        map.grid.push( data[r].map( (cell,c) => new Square(cell,r,c) ) );
    }
    map.start = map.grid.flat().find( e => e.letter === 'S');
    map.end = map.grid.flat().find( e => e.letter === 'E');

    //build g + neighbors
    for( let r = 0; r < map.grid.length; r++)
    {
        for( let c = 0; c < map.grid[r].length; c++ )
        {
            let cur = map.grid[r][c];
            cur.g = distance(cur,map.end);
            let newNeighbors = [];
            if( r-1 >=0 ) newNeighbors.push( map.grid[r-1][c] )
            if( r+1 < map.grid.length ) newNeighbors.push(map.grid[r+1][c])
            if( c-1 >=0 ) newNeighbors.push( map.grid[r][c-1] )
            if( c+1 < map.grid[r].length ) newNeighbors.push(map.grid[r][c+1])
            cur.neighbors = newNeighbors.filter( n => n.h <= cur.h+1);
        }
    }
    return map;
}

function drawMap( map )
{
    map.forEach( row =>{
        let str = '';
        row.forEach( cell => str += cell.letter);
        console.log(str);
    })
    console.log('');
}

function distance( e, n )
{
    return Math.sqrt( Math.pow((e.r-n.r),2)+ Math.pow((e.c-n.c),2));
}

const orderByFScore = (a, b) => a.f - b.f;

function climbHills( map, start, end )
{
    //drawMap(map.grid );
    start = map.grid.flat().find( m => start.r === m.r && start.c === m.c );
    let visited = [];
    let queue = [ start ];
    
    while( queue.length !== 0)
    {
        //queue.sort(orderByFScore)
        let cur = queue.shift();
        if( cur.visited ) continue;
        cur.visit();visited.push(cur);
        if( cur === end )
            break;
        for( let n = 0; n < cur.neighbors.length; n++ )
        {
            let neighbor = cur.neighbors[n];
            let hasVisited = visited.find( e => e.r == neighbor.r && e.c === neighbor.c)
            if( !hasVisited )
            {
                neighbor.prev = cur;
                queue.push( neighbor )
            }
        }
    }

    let cur = end;
    let count = 0;
    //console.log( `Found end? ${visited.includes(end)}`)
    while( cur !== start)
    {
        //console.log( `${cur.letter}(${cur.c},${cur.r})` );
        cur = cur.prev;
        count ++;
        if( !cur ) break;

    }
    return count;
}

function findTail( map )
{
    let fewest = Number.MAX_SAFE_INTEGER;
    for( let r = 0; r < map.grid.length; r++)
    {
        for( let c = 0; c < map.grid[r].length; c++ )
        {
            let cur = map.grid[r][c];
            if( cur.letter === 'a')
            {
                let climb = climbHills(map, cur, map.end)
                fewest = (climb < fewest) ? climb : fewest;
            }
        }
    }
    return fewest;
}

let example2 = JSON.parse(JSON.stringify(example))
example = buildMap( example );
example2 = buildMap(example2)
input   = buildMap( input );
input2  = buildMap( input2 );


console.log( `Part 1 [example]: ${ climbHills(example, example.start, example.end)}`); 
console.log( `Part 1 [input]: ${ climbHills(input, input.start, input.end)}`);//149 too low

console.log( `Part 2 [example]: ${findTail(example2)}`);
console.log( `Part 2 [input]: ${findTail(input)}`);