const Point = require('./point.js');

class HydrothermalVent {
    constructor( x1, y1, x2, y2 )  {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.points = this.genPoints()
    }

    static parseVent( str )
    {
        let [one,two] = str.split( ' -> ' );
        let [x1,y1] = one.split(',').map( v => parseInt(v,10) );
        let [x2,y2] = two.split(',').map( v => parseInt(v,10) );
        return new HydrothermalVent(x1,y1,x2,y2);
    }

    genPoints() {
        let arr = [];
        let minX = Math.min( this.x1, this.x2 );
        let maxX = Math.max( this.x1, this.x2 );
        let minY = Math.min( this.y1, this.y2 );
        let maxY = Math.max( this.y1, this.y2 );

        for( let i = minX; i <= maxX; i++)
        {
            for( let j = minY; j <=  maxY; j++)
            {
                arr.push( new Point(i,j) );
            }
        }
        return arr;
    }

    toString() {
        return `${this.x1},${this.y1} -> ${this.x2},${this.y2}`;
    }
}
module.exports = HydrothermalVent;