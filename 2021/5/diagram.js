module.exports = class Diagram {
    constructor( vents ){
        this.grid = [];
        this.vents = vents;      
        this.intializeGrid();
    }

    intializeGrid( )
    {
        let maxX = 0, maxY = 0;
        this.grid = [];
        this.vents.forEach(vent => {
            maxX = Math.max( maxX, vent.x1);
            maxX = Math.max( maxX, vent.x2);
            maxY = Math.max( maxY, vent.y1);
            maxY = Math.max( maxY, vent.y2);
        });  
        for( let i = 0; i <= maxX; i++ )
        {
            this.grid.push(new Array(maxY+1).fill(0));
        }

        this.vents.forEach( vent =>{
            console.log( `vent ${vent}`)
            vent.points.forEach( p =>{
                this.grid[p.y][p.x] += 1;
                console.log( `inserting (${p})`)
            })
        })
    }

    display(){
        //console.table( this.grid );
        for( let r = 0; r < this.grid.length; r++ )
        {
            let line = '';
            for( let c = 0; c < this.grid[0].length; c++ )
            {
                line += `${this.grid[r][c] === 0 ? '.' : this.grid[r][c] } `;
            }
            console.log( line );
        }
    }
}