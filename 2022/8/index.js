import {read} from '../../util/input.js'
let [example,input] = ['example','input'].map( i => read( 2022, 8, i ));
//console.log( input );
class Plot{
    constructor(height)
    {
        this.height = height;
        this.visible = null;
    }
}

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

function isVisible( data, row, col )
{
    return isVisibleNorth( data, row, col ) ||
        isVisibleEast( data, row, col ) ||
        isVisibleSouth( data, row, col ) ||
        isVisibleWest( data, row, col );
}

function treesVisible( data )
{
    data = data.map( e => e.split('').map( i => new Plot(parseInt(i))) );   

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
    console.log( data.flat().filter( p => p.visible ).length );
}
treesVisible(example);
treesVisible(input); //part 1 = 1870
