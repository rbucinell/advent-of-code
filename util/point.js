export default class Point{ 
    constructor(x,y,z=0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toString(){
        return `(${this.x},${this.y},${this.z})`;
    }
}