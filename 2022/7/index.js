import {read} from '../../util/input.js'
let [example,input] = ['example','input'].map( i => read( 2022, 7, i ));

class File { 
    constructor(name, size){
        this.name=name;
        this._size=size;
    }

    get size()
    {
        return this._size;
    }
};
class Dir {
    constructor( name, parent=null )
    {
        this.name = name;
        this.contents = [];
        this.parent = parent;
        this._size = 0;
    }
    addFile( name, size )
    {
        size = parseInt(size);
        let newFile = new File(name, size) ;
        this.contents.push( newFile);
        this._size += size;
        this._size = this.size;
        return newFile;
    }
    addDir( name )
    {
        let newDir = new Dir(name, this);
        this.contents.push( newDir );
        this._size = this.size;
        return newDir;
    }

    get size()
    {
        return this.contents.reduce( (acc,cur)=> acc + cur.size, 0 );
    }
}

function processOutput( outputs )
{
    const root = new Dir('/');
    let directories = [root];
    let cur = root;
    for( let i = 1; i < outputs.length; i++ )
    {
        let output = outputs[i].split(' ');
        
        let [prompt, command] = output;
        if( prompt === '$' )
        {
            if( command === 'cd' )
            {
                let mvDir = output[2];
                if( mvDir != '..')
                {
                    let cd = cur.contents.find( c => c.name === mvDir && c instanceof Dir)
                    if( !cd )
                    {
                        let newDir = cur.addDir( mvDir );
                        directories.push( newDir )
                        cd = mvDir;
                    }
                    cur = cd;
                }
                else{
                    cur = cur.parent;
                }
                
            }
            else if( command === 'ls' )
            {
                while( outputs[i++] !== '$' )
                {
                    if( i >= outputs.length ) break;
                    let output = outputs[i];
                    if( output.slice(0,1) === '$') {
                        i--;
                        break;
                    }
                    let listItem = output.split(' ');
                    if( listItem[0] === 'dir' )
                    {
                        let dirDisplay = cur.contents.find( c => c.name === listItem[1] && c instanceof Dir)
                        if( !dirDisplay ) directories.push( cur.addDir( listItem[1] ) );
                    }
                    else
                    {
                        let f = cur.contents.find( c => c.name === listItem[1] && c instanceof File)
                        if( !f ) cur.addFile(listItem[1], listItem[0]);
                    }
                    
                }
            }
        }
    }
    
    let small = directories.filter(d=> d.size <= 100000);
    let answer = small.reduce( (acc,cur)=> acc+cur.size, 0);
    console.log( `Part 1: ${answer}`);//part 1723892;

    //part 2
    const [TOTAL_SPACE,UPDATE_REQ] = [70000000,30000000];
    let usedSpace = root.size;
    let freeSpace = TOTAL_SPACE-usedSpace;
    let requiredFree = UPDATE_REQ - freeSpace;
    directories.sort( (a,b)=> a.size - b.size );
    let needToDel = directories.find( e => e.size > requiredFree );
    console.log( 'Part 2:', needToDel.size );//part2: 8474158
}
processOutput( example );
processOutput( input );
