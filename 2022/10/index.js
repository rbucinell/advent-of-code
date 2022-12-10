import {read} from '../../util/input.js'
let [example,input, short] = ['example','input', 'short'].map( i => read( 2022, 10, i ));

function add( arr, index, value, execTime )
{
    arr[index+execTime] = parseInt(value);
}

function addx( arr, index, value )
{
    add( arr, index, value, 2 );
}

function noop( arr, index ){
    add( arr,index, 0, 1 );
}

function signalStrenth(x)
{
    return x* 2;
}


function findSignalStregnth( signals, cycleCount )
{
    for( let i = 0; i < cycleCount; i++)
    {

    }






    let x = 1;
    let cycles = new Array( cycleCount * 20 + 1 ).fill(0);
    let addxcount = [];
    for( let c = 0; c < cycles.length; c++ )
    {
        let startValue = c-1 < 0 ? 1 :cycles[ c-1 ];
        let newVal = startValue +  cycles[c];
        let output = `[${c}] s.${startValue}  e${newVal} | `;
        if( signals.length > 0 )
        {
            let signal = signals.shift()
            let [instruction, v = 0] = signal.split(/\s/);
            eval(instruction)(cycles,c,v);
            output += ` ${cycles[c]}, ${newVal}, ${instruction}, ${v}`;
            
            if( c % 20 === 0)
            {
                //ev20.push( cycles[c])
            }
            cycles[c] = newVal;
        }
        console.log( startValue, cycles[c], newVal );// instruction, v );
        
        
    }
    //console.log( signals );
    console.log( cycles );
    let sum = 0;
    for( let cycle = 20; cycle <= cycleCount*20; cycle+=20)
    {
        console.log( cycle, cycles[cycle/2], cycles[cycle/2]*cycle*20)
        sum += cycles[cycle/2]
    }
    return sum;
}


function findStrength(arr, cycle)
{
    const orginal_cycle = cycle;
    let x = 1;
    cycle--;
    for( let i = 0; i < cycle; i++ )
    {
        if( i > arr.length) break;
        let [instruction, v = 0] = arr[i].split(/\s/);
        //console.log( arr[i],'|', instruction, v);
        x += parseInt(v);
        if( instruction === 'addx') cycle--;
    }
    console.log( x, orginal_cycle, x *orginal_cycle );
    return x*orginal_cycle;
}
let sum = 0;
sum += findStrength( example, 20 );
sum += findStrength( example, 60 );
sum += findStrength( example, 100 );
sum += findStrength( example, 140 );
sum += findStrength( example, 180 );
sum += findStrength( example, 220 );
console.log( sum );

//console.log( `short: ${findSignalStregnth( short, 1 )}`);
//console.log( `example: ${findSignalStregnth( example, 6 )} ?== 13140`);
//console.log( `example: ${findSignalStregnth( input, 6 )} ?== 13140`);