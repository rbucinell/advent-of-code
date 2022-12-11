import {read} from '../../util/input.js'
let [example,input, short] = ['example','input', 'short'].map( i => read( 2022, 10, i ));

function sumCycles( instructions, polls)
{
    let x = 1;
    let solvedPolls = [];
    let curPoll = polls.shift();
    let curCycle = 1;
    let totalInstructions = instructions.length;
    for( let i = 0; i < totalInstructions; i++)
    {
        let during = x;
        let next = instructions.shift();
        let [instruction, v=0] = next.split(/\s/);
        if( curPoll == curCycle || (curCycle % 2 === 1 && curCycle +1 === curPoll))
            {
                solvedPolls.push( curPoll * x );
                curPoll = polls.shift();
            }
        //console.log( curCycle, during);
        if( instruction === 'noop')
        {
            curCycle +=1;
        }
        else
        {
            curCycle +=2;
            x += parseInt(v);
        }
    }
    return solvedPolls.reduce( (acc,cur)=> acc+cur, 0);
}
//part 1
console.log('example',sumCycles([...example], [20,60,100,140,180,220]) );// 13140
console.log('part 1',sumCycles([...input], [20,60,100,140,180,220]) ); ///14060

//part 2

function draw( pixels )
{
    pixels = JSON.parse(JSON.stringify(pixels));
    //draw crt
    for( let i = 0; i < 6; i++ )
    {
        let row = pixels.splice(0,40);
        console.log( row.join(''));
    }
}


function drawCRT( instructions ){
    let x = 1;
    let registerPositions = new Map();

    //set register positions
    let curCycle = 1;
    let totalInstructions = instructions.length;
    for( let i = 0; i < totalInstructions; i++)
    {
        let during = x;
        let next = instructions.shift();
        let [instruction, v=0] = next.split(/\s/);

        //pixels[x] = '#'
        registerPositions.set(curCycle, during);

        if( instruction === 'noop')
        {
            curCycle +=1;
        }
        else
        {
            curCycle +=2;
            x += parseInt(v);
        }
    }

    //populate crt
    let rows = 6;
    let cols = 40;
    x = 1;
    let crt = '';
    let pixel = 0;
    for( let r = 0; r < rows; r++)
    {
        for( let c = 0; c < cols; c++)
        {
            let i = r*cols+c;
            if( registerPositions.has(i+1) )
                x = registerPositions.get(i+1);
            crt += (pixel === x-1 || pixel === x ||pixel  === x+1) ? '#':'.';
            pixel++;
            if( pixel === 40 )
            {
                pixel = 0;
                console.log( crt );
                crt = '';
            }
        }
        
    }
}
drawCRT( input );