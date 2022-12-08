import {read} from '../../util/input.js'
class Plot{
    constructor(height)
    {
        this.height = height;
        this.visible = null;
        this.score = 0;
    }
}

let [example,input] = ['example','input'].map( i => 
    read( 2022, 8, i ).map( e => e.split('').map( i => new Plot(parseInt(i)))));
//console.log( input );


function isVisibleNorth( data, row, col )
{
    let height = data[row][col].height;
    while( row-- > 0 )
    {
        if( data[row][col].height >= height ) return false;
    }
    return true;
}
function isVisibleSouth( data, row, col )
{
    let height = data[row][col].height;
    while( row++ < data.length-1 )
    {
        if( data[row][col].height >= height ) return false;
    }
    return true;
}
function isVisibleEast( data, row, col )
{
    let height = data[row][col].height;
    while( col++ < data[row].length-1 )
    {
        if( data[row][col].height >= height ) return false;
    }
    return true;
}
function isVisibleWest( data, row, col )
{
    let height = data[row][col].height;
    while( col-- > 0 )
    {
        if( data[row][col].height >= height ) return false;
    }
    return true;
}
function treesVisible( data )
{
    for( let row = 0; row < data.length; row++)
    {        
        for( let col = 0; col < data[row].length; col++)
        {
            if (row === 0 || row === data.length-1 || col === 0 || col === data[row].length-1){
                data[row][col].visible = true;
                continue;
            }
            data[row][col].visible = isVisible( data, row, col );

        }
    }
    let count = 0;
    for( let row = 0; row < data.length; row++)
    {        
        for( let col = 0; col < data[row].length; col++)
        {
            count += data[row][col].visible? 1: 0;
        }
    }
    console.log( `Visible Trees: `, data.flat().filter( p => p.visible ).length );
}
function isVisible( data, row, col )
{
    return isVisibleNorth( data, row, col ) ||
        isVisibleEast( data, row, col ) ||
        isVisibleSouth( data, row, col ) ||
        isVisibleWest( data, row, col );
}

function northScore( data, row, col )
{
    let height = data[row][col].height;
    let dist = 1;
    while( --row > 0 )
    {
        if( data[row][col].height < height ) dist++;
        else break;
    }
    return dist;
}

function southScore( data, row, col )
{
    let height = data[row][col].height;
    let dist = 1;
    while( ++row < data.length-1 )
    {
        if( data[row][col].height < height ) dist++;
        else break;
    }
    return dist;
}
function eastScore( data, row, col )
{
    let height = data[row][col].height;
    let dist = 1;
    while( ++col < data[row].length-1 )
    {
        if( data[row][col].height < height ) dist++;
        else break;
    }
    return dist;
}
function westScore( data, row, col )
{
    let height = data[row][col].height;
    let dist = 1;
    while( --col > 0 )
    {
        if( data[row][col].height < height ) dist++;
        else break;
    }
    return dist;
}

function sceneicScore( data, row, col )
{
    if( row === 0 || col === 0 ) return 0;
    let scores = [northScore( data, row, col ),
        westScore( data, row, col ),
        southScore( data, row, col ),
        eastScore( data, row, col )];
    return scores.reduce( (acc,cur)=> acc * cur );
}

function largestScenicScore(data)
{
    let latergestScore = 0;
    for( let row = 0; row < data.length; row++)
    {        
        for( let col = 0; col < data[row].length; col++)
        {
            data[row][col].score = sceneicScore( data, row, col );
            if( data[row][col].score > latergestScore)
            latergestScore = data[row][col].score;
        }
    }
    console.log( `Largest Score = ${latergestScore}`)
}
//Part 1
treesVisible(example); //21
treesVisible(input); //1870

//Part 2
largestScenicScore(example); //12
largestScenicScore(input); //517440