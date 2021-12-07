class BingoBoard{
    constructor( two2darray ) {        
        this.board = two2darray.map(arr => {
            return arr.map( element => {
                return  { 'val': parseInt(element,10), 'marked': false };
            });
        });
    }

    mark( row, col, mark=true  )
    {
        this.board[row][col].marked = mark;
    }

    add( num )
    {
        this.board.forEach( row => {
            row.forEach( cell => {
                if( cell.val == num ) cell.marked = true;
        })});
    }

    clear()
    {
        this.board.forEach(row => row.forEach( cell => this.marked = false ));
    }

    calcuate(){
        let sum = 0;
        this.board.forEach(row => row.forEach( cell => sum += !cell.marked ? cell.val : 0 ) );
        return sum;
    }

    toString(){
        let str = '';
        this.board.forEach(row => {
            str += '[ '
            row.forEach( cell => str += (cell.marked ? `{${cell.val}}` : `${cell.val}`) + '\t\t' );
            str += ']\n'
        } );
        str += `SUM = ${this.calcuate()}`;
        return str;
    }

    hasWon() {

        //check horizontal
        let winningRow = this.board.find( row => row.filter( e => e.marked ).length === row.length );
        if( winningRow ) return true;
        //check vertical
        for( let c = 0; c < this.board[0].length; c++ )
        {
            let markCount = 0;
            for( let r = 0; r < this.board.length; r++ )
            {
                markCount += this.board[r][c].marked ? 1 : 0; 
            }
            if( markCount === this.board.length ) return true;
        }
        return false;
    }
}
module.exports = BingoBoard;