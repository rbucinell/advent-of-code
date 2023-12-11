export class Loc {
    constructor( r, c ){
        this.r = r;
        this.c = c;
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

    /** 
     * @param {Loc} loc 
     */
    getNode( r, c, loc ) {
        return this.nodes[ r ][ c ];
    }

    /** 
     * @param {Loc} loc 
     */
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
        for( let i = neighbors.length; i >= 0; i--){
            let neighbor = neighbors[i];
            if( neighbor.r < 0 || neighbor.c < 0 || neighbor.r >= this.rows || neighbor.c >= this.cols ) neighbors.splice(i,1);
        }
        return neighbors;
    }
}