import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url ); //let inputs = build(import.meta.url, ['example']);

function makeJoltage( bank:string, indicies:number[] ){
    return parseInt(indicies.map( i => bank[i] ).join(''));
}
function findLargest( memo:Record<string,any>, bank:string, bat1:number, bat2:number ):number{
    let j = makeJoltage(bank, [bat1, bat2]);
    const key = [bat1, bat2].toString();

    if( !(key in memo) ){
        let b1 = (bat1+1>=bank.length || bat2+1 >= bank.length) ? Number.MIN_VALUE : findLargest(memo, bank,bat1+1,bat2+1);
        let b2 = (bat2+1 >= bank.length) ? Number.MIN_VALUE: findLargest(memo, bank,bat1,  bat2+1);
        memo[key] = Math.max(j, b1, b2 );
    }
    return memo[key];
}

function largestJoltage( bank:string ):number {
    let memo:Record<string,any> = {};
    const joltage = findLargest( memo, bank, 0, 1);
    console.log( `In ${bank}, you can make the larget joltage possible, ${joltage}`)
    return joltage;
}

function part1( data:string[] ):number {
    return data.map( bank => largestJoltage(bank)).reduce( (acc,cur) => acc + cur, 0 );
}

function part2( data:string[] ):number {
    return 0;
}

execute([part1, part2], inputs);