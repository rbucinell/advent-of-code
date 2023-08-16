import {read} from '../../util/input.js'
import Point from '../../util/point.js'

let [example,input] = ['example','input'].map( i => read( 2022, 14, i ));
console.log( example );

class LineSegment{
    constructor( a, b)
    {
        this.a = a;
        this.b = b;
    }
}

function parseLineSegments( data ){
    let min = new Point(Number.MAX_SAFE_INTEGER,0)
    let max = new Point(0,0)
    let segments = [];
    data.forEach(row => {
        let points = row.split( '->').map( e => e.trim().split(',').map( cord => parseInt(cord)) );
        points.forEach( pt =>{
            min.x = Math.min( pt[0], min.x);
            max.x = Math.max( pt[0], max.x);
            max.y = Math.max( pt[1], max.y);
        })
        for( let i = 1; i < points.length; i++)
        {
            segments.push( new LineSegment(
                new Point(...points[i-1]), 
                new Point(...points[i])
            ));
        }
    });
    return [segments,min,max];
}

/**
 * 
 * @param {Point} cur in the matrix
 * @param {Point} minX 
 * @param {Point} maxY 
 * @param {Array<Point>} memo 
 */
function possiblities( cur, min, max, memo){
    if( cur.x < minX || curX > maxX || curY === maxY ) return 0;
    if( !memo.has(p) )
        return memo.get(cur);
    //  else
    // {
    //     //let paths = possiblities( )
    // }
    return 1;

}

function part1( data ){    
    let [segments,min,max] = parseLineSegments( data );
    let rocks = [];
    segments.forEach( seg => {
        let [xStart,xEnd] = [seg.a.x, seg.b.x].sort()
        let [yStart,yEnd] = [seg.a.y, seg.b.y].sort()
        for( let x = xStart; x <= xEnd; x++ )
        {
            for( let y = yStart; y <= yEnd; y++ )
            {
                rocks.push(new Point(x,y));
            }
        }
    });
    drawGrid( min, max, rocks);
    let start = new Point(500,0);
    console.log( start );
    rocks.set(start);
    return possiblities( segments, start, min, max, rocks);
}

function part2( data ){
    return 0;
}

/**
 * 
 * @param {Point} min
 * @param {Point} max
 * @param {Set<Point>} rocks
 */
function drawGrid( min, max, rocks)
{
    let cols = max.y - min.y + 1;
    let rows = max.x - min.x + 1;
    let start = new Point(500,0);
    var arr = Array.from(Array(rows), () => Array(cols).fill('.'));

    const ptToIndex = pt => [pt.y-min.y,pt.x-min.x];

    //headers
    for( let n = 0; n < 3; n++)
    {
        let str = `  `;
        for( let r = min.x; r <= max.x ; r ++ )
        {
            str += ( r === min.x || r === start.x || r === max.x ) ? `${r}`.charAt(n): ' ';
        }
        console.log( str );
    }
    //body
    let [sr,sc] = ptToIndex(start);
    arr[sr][sc] = '+';
    rocks.forEach(rock => {
        let [rr,rc] = ptToIndex(rock);
        arr[rr][rc] = '#';
    });
    //rocks.forEach(rock => arr[rock.y - min.y-1][rock.x - min.x-1] = '#');
    for( let r = min.y; r <= max.y ; r ++ )
    {
        // for( let c = min.x; c <= max.x; c++ )
        // {
        //     let cur = new Point( r, c );
        //     if( rocks.includes( rock => rock.x === cur.x && rock.y === cur.y ) )
        //     {
        //         arr[r-min.y][c-min.x] = '#';
        //     }
        //     if( c == 500 && r === 0) arr[r-min.y][c-min.x] = '+'
        // }
        console.log( r, arr[r].join(''));
    }
}


console.log( `Example: ${part1( example )}`)
console.log( `Part1: ${part1( input )}`)
console.log( `Part2: ${part2( input )}`)