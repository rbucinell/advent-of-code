import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url, ['example'] ); //let inputs = build(import.meta.url, ['example']);

function makeJoltage( bank:string, indicies:number[] ){
    return parseInt(indicies.map( i => bank[i] ).join(''));
}
function findLargest( memo:Record<string,any>, bank:string, positions:number[] ):number{
    let j = makeJoltage(bank, positions);
    console.log( positions, '=', j );
    const key = positions.toString();

    if( !(key in memo) ){

        let incrementScenarios = [];
        for(let index = positions.length -1; index >= 0; index-- ){
            
            let newPositions = JSON.parse(JSON.stringify(positions));
            let valid = true;
            //increment this and all to the right by 1
            for( let i = index; i < newPositions.length; i++){
                newPositions[i] += 1;
                if( newPositions[i] >= bank.length ){
                    valid = false;
                }
            }
            if( valid ){
                incrementScenarios.push( newPositions );
            }else{
                memo[newPositions.join('')] = Number.MIN_VALUE;
            }
        }
        //let b1 = (bat1+1>=bank.length || bat2+1 >= bank.length) ? Number.MIN_VALUE : findLargest(memo, bank,bat1+1,bat2+1);
        //let b2 = (bat2+1 >= bank.length) ? Number.MIN_VALUE: findLargest(memo, bank,bat1,  bat2+1);
        memo[key] = Math.max(j, ...incrementScenarios.map( (_:number[]) => _.some( (e:number) => e >= bank.length) ? Number.MIN_VALUE : findLargest( memo, bank, _)) );
    }
    return memo[key];
}

function largestJoltage( bank:string, numberOfBatteries:number ):number {
    let memo:Record<string,any> = {};
    let initialPositions = Array.from({length:numberOfBatteries}, (v,k)=>k);
    const joltage = findLargest( memo, bank, initialPositions);
    console.log( `In ${bank}, you can make the largest joltage possible, ${joltage}`)
    return joltage;
}

function part1( data:string[] ):number {
    return data.map( bank => largestJoltage(bank, 2)).reduce( (acc,cur) => acc + cur, 0 );
}

function part2( data:string[] ):number {
    return data.map( bank => largestJoltage(bank, 12)).reduce( (acc,cur) => acc + cur, 0 );
}

execute([part1, part2], inputs);
//[10100.64ms]	Part1	Example: 357 
//[650.20ms]	Part1	Input: 17445 
//[]	        Part2	Example: 3121910778619 
//[]	        Part2	Input: 