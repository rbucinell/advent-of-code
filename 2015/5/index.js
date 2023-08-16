import {readFromDir} from '../../util/input.js'
import path from 'path'
const curDir = path.dirname(new URL(import.meta.url).pathname);
let [example,input] = ['example','input'].map( f => readFromDir(curDir, f));

function isNice( str )
{
    const isVowel = c => 'aeiou'.includes( c );
    let aeiouCount = isVowel(str[0]) ? 1 : 0;
    let doubleUp = false;
    for( let i = 1; i < str.length; i++ )
    {
        let c = str[i];
        let prev = str[i-1];
        if( ['ab','cd','pq','xy'].includes( `${prev}${c}`) )
            return false;
        aeiouCount += isVowel(c) ? 1: 0;
        if( c === str[i-1] ) doubleUp = true;
    }
    return aeiouCount >=3 && doubleUp;

}

function part1( data ){
    return data.filter( lines => isNice(lines) ).length;
}


function isNewNice( str )
{
    let nonOverlapPair = false;
    let repeatOneBetween = false;
    for( let i = 1; i < str.length; i++ )
    {
        let c = str[i];
        let prev = str[i-1];
        const pair = `${prev}${c}`;
        const pairIndex1 = str.indexOf(pair);
        const pairIndex2 = str.indexOf(pair,pairIndex1+2);
        if( pairIndex1 !== -1 && pairIndex2 !== -1 && pairIndex2 !== str.length ) nonOverlapPair = true;
        
        if( i+2 < str.length ){
            let next = str[i+2];
            if( c === next ) repeatOneBetween = true;
        }
    }
    return nonOverlapPair && repeatOneBetween;
}

function part2( data ){
    return data.filter( lines => isNewNice(lines) ).length;
}

console.log( "Example Part1:",part1( example ) );
console.log( "Input   Part1:",part1( input ) ); //238

console.log( "Example Part2:",part2( example ) );
console.log( "Input   Part2:",part2( input ) );