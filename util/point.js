export default class Point{ 
    constructor(x,y,z=null){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toString(){
        return `(${this.x},${this.y},${this.z ?? ''})`;
    }

    /**
     * @param {Point} other 
     * @returns true if they are the same point
     */
    equals( other ){ 
        let eq = this.x === other.x && this.y === other.y;
        if( z !== null ){
            eq = eq && this.z === other.z;
        }
        return eq;
    }
}