export const Orientation = {
    North: 'N',
    NorthEast: 'NE',
    East: 'E',
    SouthEast: 'SE',
    South: 'S',
    SouthWest: 'SW',
    West: 'W',  
    NorthWest: 'NW',

    isValid(value) {
        return this.list().includes(value);
    },

    list( includeDiag = false ){
        let list = Object.values(this).filter(value => typeof value === 'string');
        if( !includeDiag ) {
            list = list.filter( _ => _.length === 1 )
        }
        return list;
    },

    turnRight( currentOrientation, includeDiag = false ){
        const directions =this.list(includeDiag);
        let index = directions.indexOf( currentOrientation );
        index = (index+1 >= directions.length) ? 0 : index +1;
        return directions[index];
    },

    turnLeft( currentOrientation, includeDiag = false ){
        const directions =this.list(includeDiag);
        let index = directions.indexOf( currentOrientation );
        index = (index-1 < 0) ? directions.length-1 : index - 1;
        return directions[index];
    },
};
Object.freeze(Orientation);

export class Loc {
    constructor( r, c ){
        this.r = r;
        this.c = c;
    }

    /**
     * Returns a new Loc based on the current and shifting values
     * @param {int} shiftR the relative amount of rows to shift
     * @param {int} shiftC the relative amount of cols to shift
     * @returns {Loc} a new Loc shifted from the given values
     */
    to( shiftR, shiftC ){
        return new Loc(this.r+shiftR, this.c+shiftC);
    }

    /**
     * @param {Loc} other 
     */
    equals( other ){ return this.r === other.r && this.c === other.c; }
}

export class Node {

    /**
     * @param {any} val 
     * @param {Loc} loc 
     */
    constructor( val, r, c ){
        this.value = val;
        this.loc = new Loc(r,c);
    }

    /**
     * @param {Node} other 
     */
    equals( other ){
        this.value === other.value && this.loc.equals(other.loc);
    }
}

export class Grid {
    constructor( rows, cols, arr2DSource = null ){
        this.rows = rows;
        this.cols = cols;
        this.nodes = [];
        for( let r = 0; r < rows; r++ ){
            let row = [];
            for( let c = 0; c < cols; c++){
                let data = arr2DSource ? arr2DSource[r][c] : null;
                row.push( new Node(data, r,c) );
            }
            this.nodes.push(row);
        }
    }

    static from2DArr( arr2d ){
        let grid = Grid( arr2d.length, arr2d[0].length);
        grid.rows = arr2d.length;
        grid.cols = arr2d[0].length;
        for( let row of arr2d){
            for( let col of arr2d[row]){
                grid.nodes = new Node(arr2d[row][col],row,col);
            }
        }
        return grid;
    }

    
    getNode( r, c ) {
        if( r < 0 || c < 0 || r >= this.nodes.length || c >= this.nodes[r].length) 
            return undefined;
        return this.nodes[ r ][ c ];
    }

    setNode(r, c, val){
        this.nodes[r][c].value = val;
    }

    find( value ){
        for( const row of this.nodes){
            for( const cur of row ){
                if( cur.value === value)
                    return cur;
            }
        }
        return null;
    }

    /**
     * Given a location, returns the neighbor in the given direction.
     * @param {number} r The row of the source location
     * @param {number} c The column of the source location
     * @param {Orientation} direction The direction of the neighbor to return
     * @return {Node} The neighbor node in the given direction, or null if no neighbor exists
     */
    getNeighbor( r, c , direction) {
        let neighbor = undefined;
        switch( direction ){
            case Orientation.North:
                neighbor = this.getNode(r-1, c);
            break;
            case Orientation.NorthEast:
                neighbor = this.getNode(r-1, c+1);
            break;
            case Orientation.East:
                neighbor = this.getNode(r, c+1);
            break;
            case Orientation.SouthEast:
                neighbor = this.getNode(r+1, c+1);
            break;
            case Orientation.South:
                neighbor = this.getNode(r+1, c);
            break;
            case Orientation.SouthWest:
                neighbor = this.getNode(r+1, c-1);
            break;
            case Orientation.West:
                neighbor = this.getNode(r, c-1);
            break;
            case Orientation.NorthWest:
                neighbor = this.getNode(r-1, c-1);
            break;
            default:
                neighbor = undefined;
                break;
        }
        return neighbor;
    }

    getNeighbors( r, c, includeDiag = false) {
        let neighbors = [];
        neighbors.push( new Loc( r-1, c ));
        neighbors.push( new Loc( r+1, c ));
        neighbors.push( new Loc( r , c-1 ));
        neighbors.push( new Loc( r , c+1 ));
        if( includeDiag ){
            neighbors.push( new Loc( r+1 , c+1 ));
            neighbors.push( new Loc( r+1 , c-1 ));
            neighbors.push( new Loc( r-1 , c+1 ));
            neighbors.push( new Loc( r-1 , c-1 ));
        }
        for( let i = neighbors.length-1; i >= 0; i--){
            let neighbor = neighbors[i];
            if( neighbor.r < 0 || neighbor.c < 0 || neighbor.r >= this.rows || neighbor.c >= this.cols ) neighbors.splice(i,1);
        }
        return neighbors;
    }

    display(){
        let output = '';
        for( const row of this.nodes){
            output += `${row.map( _ => _.value).join('')}\n`;
        }
        return output;
    }
}