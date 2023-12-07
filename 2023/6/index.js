import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

class Race {
    constructor( time, distance){
        this.time = time;
        this.distance = distance;
    }

    waystowin() {
        let wins = 0;
        for( let i = 0; i <= this.time; i++ ) {
            let remaining = this.time - i; //as soon as this goes into a successfull amount, the remaing would be the last accepted value too 30/200: 11-19
            let dist = remaining * i;
            if( dist > this.distance ) 
                wins++;
        }
        return wins;
    }
}


function part1( data ){
    
    let times = data[0].replace('Time:', '').trim().split(' ').filter( v => v !== '' ).map( n => parseInt(n));
    let distances = data[1].replace('Distance:', '').trim().split(' ').filter( v => v !== '' ).map( n => parseInt(n));
    let races = [];
    for( let i = 0; i < times.length; i++ ){
        races.push( new Race( times[i], distances[i]))
    }
    return races.reduce( (acc,cur) => acc * cur.waystowin(), 1);
}

function part2( data ){
    let times = parseInt(data[0].replace('Time:', '').replaceAll(' ', ''));
    let distances = parseInt(data[1].replace('Distance:', '').replaceAll(' ', ''));
    let race = new Race(times, distances);
    return race.waystowin();
}

execute([part1, part2], inputs);