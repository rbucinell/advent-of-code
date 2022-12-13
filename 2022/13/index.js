import {read} from '../../util/input.js'
let [example,input] = ['example','input'].map( i => read( 2022, 13, i ));


function parsePairs( data )
{
    let pairs = [];
    for( let i = 0; i < data.length; i+=3)
    {
        let packets1 = JSON.parse(data[i]);
        let packets2 = JSON.parse(data[i+1]);
        pairs.push([packets1,packets2])
    }
    return pairs;
}

function pp( packet )
{
    return Array.isArray(packet) ? `[${packet.map(p=> pp(p))}]` : packet;
}

function inOrder( packetsLeft, packetsRight )
{
    console.log( `- Compare ${pp(packetsLeft)} vs ${pp(packetsRight)}`)
    if( Array.isArray(packetsLeft) && Array.isArray(packetsRight))
    {
        if(packetsLeft.length === 0 && packetsRight.length > 0) return 1;
        if(packetsRight.length === 0 && packetsLeft.length > 0) return -1;
        if(packetsRight.length === 0 && packetsLeft.length === 0) return 0;
        
        let firstLeft  = packetsLeft.shift();
        let firstRight = packetsRight.shift();

        if( typeof firstLeft !== typeof firstRight)
        {
            if( typeof firstLeft === 'number' ) firstLeft = [firstLeft]
            if( typeof firstRight === 'number' ) firstRight = [firstRight]
        }




        console.log( `- Compare ${pp(firstLeft)} vs ${pp(firstRight)}`)
        if( typeof firstLeft === 'number' && typeof firstRight === 'number')
        {
            if( firstLeft === firstRight) return inOrder(packetsLeft,packetsRight)
            else {
                return firstLeft === firstRight ? 0 : (firstLeft < firstRight ? 1 : -1)
            }
        }else{
            let cur = inOrder(firstLeft, firstRight);
            return cur === 0 ? inOrder(packetsLeft, packetsRight) : cur;
        }
    }    
}

function part1(data){
    let pairs = parsePairs( data );
    let sum = 0;
    pairs.forEach( (pair,i) =>{
        console.log( `== Pair ${i+1} == `)
        if( inOrder(...pair) === 1 ) {
            console.log('In the right order');
            sum+= (i+1);
        }else
        {
            console.log('In the wrong order');
        }
        console.log( '' )
    });
    return sum;
}



console.log( `Part 1 example: ${ part1(example)}` );
console.log( `Part 1 input: ${ part1(input)}` ); //5529