import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

class AlmanacConversion {
    constructor( destRangeStart, srcRangeStart, rangeLen ){
        this.destRangeStart = destRangeStart;
        this.srcRangeStart = srcRangeStart;
        this.rangeLen = rangeLen;
        this.conversionMap = {};
        for( let i = 0; i < this.rangeLen; i++ ){
            this.conversionMap[ this.srcRangeStart + i ]  = this.destRangeStart + i;
        }
    }

    convert( input ){
        return input in this.conversionMap ? this.conversionMap[input] : input;
    }
}

class AlmanacMap{
    constructor( name, conversions ){
        this.name = name;
        this.conversions = conversions.map(c => {
            let [ destRangeStart, srcRangeStart, rangeLen] = c.split(' ').map( s => parseInt( s ));
            return {destRangeStart, srcRangeStart, rangeLen};
        });
    }
        
    convert( input ) {
        for( let conversion of this.conversions ){
            if( input >= conversion.srcRangeStart && input <= conversion.srcRangeStart + conversion.rangeLen ){
                let diff = input - conversion.srcRangeStart;
                return conversion.destRangeStart + diff;
            }
        }
        return input;
    }
}

class Almanac {
    constructor( lines ) {
        this.seeds = lines.shift().replace('seeds: ', '').split(' ').map( s => parseInt(s));
        lines.shift();//burn space
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


}


function part1( data ){
    let almanac = new Almanac(data);
    let lowestLocation = Number.MAX_VALUE;
    almanac.seeds.forEach( seed => {
        let value = seed;
        almanac.maps.forEach( map => {
            let out = map.convert( value );
            value = out;
        });
        lowestLocation = Math.min( lowestLocation, value );
    })
    return lowestLocation;
}

function part2( data ){
    
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );