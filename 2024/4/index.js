import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

function findXMAS( data, x, y ){

    //console.log( "(x,y): ",x, y );
    let findCount = 0;

    let directions = [
        [{ x: 0,  y: -1 }, {  x: 0,  y: -2 },  { x: 0,  y: -3 }], //N
        [{ x: 1,  y: -1 }, {  x: 2,  y: -2 },  { x: 3,  y: -3 }], //NE
        [{ x: 1,  y: 0 },  {  x: 2,  y: 0  },  { x: 3,  y: 0 }],  //E
        [{ x: 1,  y: 1 },  {  x: 2,  y: 2  },  { x: 3,  y: 3 }],  //SE
        [{ x: 0,  y: 1 },  {  x: 0,  y: 2  },  { x: 0,  y: 3 }],  //S
        [{ x: -1, y: 1 },  {  x: -2, y: 2  },  { x: -3, y: 3 }],  //SW
        [{ x: -1, y: 0 },  {  x: -2, y: 0  },  { x: -3, y: 0 }],  //W
        [{ x: -1, y: -1 },  { x: -2, y: -2 },  { x: -3, y: -3 }], //SW
    ];

    const MAS = "MAS";
    for( let dir of directions ){

        //console.log( "DIR: ", JSON.stringify(dir));
        let found = true;
        for(let i = 0; i < MAS.length; i++ ) {
            let letter = MAS.charAt(i);
            let d = dir[i];

            let cord = {
                x: x + d.x,
                y: y + d.y
            }
            //console.log( "Letter", MAS.charAt(i),"Cord:", JSON.stringify(cord ));
            if( cord.x < 0 || cord.y < 0 || cord.x >= data.length || cord.y >= data[cord.x].length ){
                found = false;
                break;
            }

            if( data[cord.x][cord.y] !== letter ){
                found = false;
                break;
            }
        }
        if( found ) findCount++;

    }

    return findCount;
}

function findCrossMAS( data, x, y ){
    if( x - 1 < 0 || y - 1 < 0 || x + 1 >= data.length || y + 1 >= data[x].length ) return false;
    const backslashWord     = `${data[x-1][y-1]}${data[x][y]}${data[x+1][y+1]}`;
    const forwardslashWord  = `${data[x+1][y-1]}${data[x][y]}${data[x-1][y+1]}`;
    return (backslashWord === "SAM" || backslashWord === "MAS") && (forwardslashWord == "SAM" || forwardslashWord == "MAS");
}


function part1( data ){
    let sum = 0;
    for( let i = 0; i < data.length; i++ ){
        for( let j = 0; j < data[i].length; j++ ){
            if( data[i][j] === 'X'){
                sum += findXMAS(data, i, j );
            }
        }
    }
    return sum;
}

function part2( data ){
    let sum = 0;
    for( let i = 0; i < data.length; i++ ){
        for( let j = 0; j < data[i].length; j++ ){
            if( data[i][j] === 'A'){
                sum += findCrossMAS(data, i, j )? 1 : 0;
            }
        }
    }
    return sum;
}

execute([part1, part2], inputs);