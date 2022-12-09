import {read} from '../../util/input.js'
let [example,input] = ['example','input'].map( i => read( 2022, 9, i ));
let example2 = [
    'R 5',
    'U 8',
    'L 8',
    'D 3',
    'R 17',
    'D 10',
    'L 25',
    'U 20'
];

function move( pos, dir )
{
    switch (dir) {
        case 'U':
            pos.y++;
        break;
        case 'R':
            pos.x++;
        break;
        case 'D':
            pos.y--;
        break;
        case 'L':
            pos.x--;
        break;
    }
}

function isTouching( cur, prev) 
{
    for( let i = -1; i <= 1; i++ )
        for( let j = -1; j <= 1; j++ )
            if( cur.x === prev.x+i && cur.y === prev.y+j) 
                return true;
    return false;
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function catchup(body,prev)
{
    if( body.x !== prev.x )
        body.x += clamp((prev.x - body.x), -1, 1 );;
    if( body.y !== prev.y)
        body.y += clamp((prev.y - body.y), -1, 1 );;
}

function countVisits( motions, knots )
{
    let visit = new Set();
    let snake = Array.from(Array(knots), () => {
        return { x: 1, y: 1};
    });
    visit.add(`${snake[0].x}.${snake[0].y}`);

    motions.forEach( step =>
    {
        let [dir,count] = step.split(' ');
        count = parseInt(count);

        for( let c = 0; c < count; c++)
        {
            move(snake[snake.length-1], dir); //move head

            //parse down the rest of the body
            for( let s = snake.length-2; s >=0; s-- )
            {
                let prev = snake[s+1]; //tail
                let body = snake[s];   //head
                if( !isTouching(body,prev))
                {
                    catchup(body,prev);
                    if( body === snake[0]) //last part of snake
                        visit.add(`${snake[0].x}.${snake[0].y}`); 
                }
            }
        }
    });
    return visit.size;
};

console.log( `example: ${countVisits( example, 2)}`); //13
console.log( `part 1:  ${countVisits( input, 2 )}`); //part 1 solve: 6391

console.log( `example:  ${countVisits( example,  10 )}`); //1
console.log( `example2: ${countVisits( example2, 10 )}`); //36
console.log( `part 1:   ${countVisits( input,    10 )}`); //part 2 solve: 2593
