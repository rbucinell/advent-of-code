import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

class AlmanacMap{
    constructor( name, conversions ){
        this.name = name;
        this.conversions = conversions.map(c => {
            let [ destRangeStart, srcRangeStart, rangeLen] = c.split(' ').map( s => parseInt( s ));
            return { 
                src: {
                    start: srcRangeStart,
                    stop: srcRangeStart + rangeLen-1,
                },
                dest: {
                    start: destRangeStart,
                    stop: destRangeStart+ rangeLen-1
                },
                shift: dest.start - src.start
            }
        });
        this.conversions.sort( (a,b) => a.src.start - b.src.start);
    }
        
    convert( input ) {
        for( let c of this.conversions ){
            if( input >= c.src.start && input <= c.src.stop ){
                return input + c.shift;
            }
        }
        return input;
    }
}

class Almanac {
    constructor( lines ) {
        this.maps = [];
        let name = '';
        let conversions = [];
        
        for( let i = 0; i < lines.length; i++ ){
            let line = lines[i];
            if( line === '' ){
                this.maps.push(new AlmanacMap( name, conversions ));
                name = '';
                conversions = [];
            }
            else{
                if( line.includes('map')){
                    name = line;
                }else{
                    conversions.push( line );
                }
            }
        }
        this.maps.push(new AlmanacMap( name, conversions ));
    }

    lowestLocation( seeds ){
        let lowestLocation = Number.MAX_VALUE;
        seeds.forEach( seed => {
            lowestLocation = Math.min( lowestLocation, this.getLocation( seed ) );
        });
        return lowestLocation;
    }

    getLocation( seed ){
        let value = seed;
        this.maps.forEach( map => value = map.convert( value ) );
        return value;
    }
}


function part1( data ){
    let d = JSON.parse( JSON.stringify(data));
    let seeds = d.shift().replace('seeds: ', '').split(' ').map( s => parseInt(s));
    d.shift();//burn space
    let almanac = new Almanac(d);
    return almanac.lowestLocation(seeds);
}

function part2( data ){
    let d = JSON.parse( JSON.stringify(data));
    let seedPairs = d.shift().replace('seeds: ', '').split(' ').map( s => parseInt(s));
    d.shift();//burn space
    let almanac = new Almanac(d);
    let lowest = Number.MAX_VALUE;
    for( let i = 0; i < seedPairs.length; i+=2){

        let start = seedPairs[i];
        let count = seedPairs[i+1];
        for( let s = 0; s < count; s++ ){
            let seed = start + s;
            let location = almanac.getLocation( seed );
            lowest = Math.min( lowest, location);
        }
    }
    return lowest;
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );

//Example Part1: 35
//Input   Part1: 261668924
//Example Part2: 46
//Input   Part2: 24261545