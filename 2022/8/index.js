import {read} from '../../util/input.js'
class Plot{
    constructor(height)
    {
        this.height = height;
        this.visible = true;
        this.score = 0;
    }
}

let [example,input] = ['example','input'].map( i => 
    read( 2022, 8, i )
    .map( e => e.split('')
    .map( i => new Plot(parseInt(i)))));

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
    //initialize with outsize permimeter
    let count = data.length*2+ data[0].length*2; 
    data.forEach((row,r) => row.forEach( (plot,c) => {
        plot.visible = isVisible( data, r, c );
        if( plot.visible ) count ++;
    }));
    console.log( `Visible Trees = ${data.flat().filter( p => p.visible ).length}`);
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
    let largestScore = 0;
    data.forEach((row,r) => row.forEach( (col,c) => {
        let score = sceneicScore( data, r, c );
        if( score > largestScore) largestScore = score;
    }));
    console.log( `Largest Score = ${largestScore}`);
}

//Part 1
treesVisible(example); //21
treesVisible(input); //1870

//Part 2
largestScenicScore(example); //12
largestScenicScore(input); //517440