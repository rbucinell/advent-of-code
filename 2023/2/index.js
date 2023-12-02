import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));


//Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
function parseLine( line ){

    let colonIndex = line.indexOf(':');
    let id= line.substring(5,colonIndex);
    let cubeSets = line.substring(colonIndex+1).split(';');
    cubeSets = cubeSets.map( cs => {        
        return cs.split(',').map( r => {
            let [count, color] = r.trim().split(' ');
            return { count: parseInt(count.trim()), color: color.trim() }
        })        
    })
    return { id: parseInt(id), sets: cubeSets }
}

function part1( data ){

    let possibleIds = [];

    const max = {
        red: 12,
        green: 13,
        blue: 14
    }

    data.forEach(element => {
        let { id, sets } = parseLine(element);
        
        let impossibles = sets.filter( set =>{
            for( let s of set ){
                let {color,count} = s;
                if( count > max[color]) return true;
            }
        });

        if( impossibles.length === 0) possibleIds.push( id );
        
    });
    return possibleIds.reduce( (acc,cur) => acc + cur, 0 );
}

function part2( data ){

    let possible = data.map( element => {
        let { id, sets } = parseLine(element);
        let minNeeded = {};
        sets.forEach( set => {
            set.forEach( s => {
                let {color,count} = s;
                if( !(color in minNeeded )) 
                    minNeeded[color] = count;
                else{
                    minNeeded[color] = Math.max( minNeeded[color], count)
                }
            })
        });
        return Object.values(minNeeded).reduce( (acc,cur) => acc * cur );
    });
    return possible.reduce( (acc,cur) => acc + cur, 0 );
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) );

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );