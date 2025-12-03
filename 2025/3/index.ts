import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url, ['example'] ); //let inputs = build(import.meta.url, ['example']);

function makeJoltage( bank:string, indicies:number[] ){
    return parseInt(indicies.map( i => bank[i] ).join(''));
}

function findLargest( memo:Record<string,any>, bank:string, positions:number[], prevJoltage:number ):number{
    let j = makeJoltage(bank, positions);
    console.log( positions, '=', j, ', prev=', prevJoltage );
    const key = positions.toString();

    if( !(key in memo) ){
        memo[key] = j;
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
                if( !(newPositions.toString() in memo)) {
                    incrementScenarios.push( newPositions );
                }
            }else{
                memo[newPositions.toString()] = Number.MIN_VALUE;
            }
        }
        //let b1 = (bat1+1>=bank.length || bat2+1 >= bank.length) ? Number.MIN_VALUE : findLargest(memo, bank,bat1+1,bat2+1);
        //let b2 = (bat2+1 >= bank.length) ? Number.MIN_VALUE: findLargest(memo, bank,bat1,  bat2+1);
        //incrementScenarios.forEach( s => console.log( `\t${s}`))
        let compare = incrementScenarios.map( (_:number[]) => findLargest( memo, bank, _, j ));
        

        memo[key] = Math.max(j, ...compare );
    }
    return memo[key];
}

function largestJoltage( bank:string, numberOfBatteries:number ):number {
    console.time(bank);
    let memo:Record<string,any> = {};
    let initialPositions = Array.from({length:numberOfBatteries}, (v,k)=>k);
    const joltage = findLargest( memo, bank, initialPositions,-1);
    console.timeEnd(bank);
    //console.log( `In ${bank}, you can make the largest joltage possible, ${joltage}`)
    return joltage;
}


function iteratativeJoltage( bank:string, numberOfBatteries:number):number {

    let numberLocations:number[][] = Array.from({ length: 10 }, (v,k) => ([] as number[]));

    for( let i = 0; i < bank.length; i++ ){
        console.log( i, bank[i])
        numberLocations[ parseInt(bank[i]) ].push( i );
    }
    for( let i = 0; i < numberLocations.length; i++ ){
        numberLocations[ i ].sort();
    }

    let currentleftmostavailble = -1;
    let positions = Array.from({ length: numberOfBatteries}, (k,v) =>bank.length-v).reverse();
    for( let b = 0; b < numberOfBatteries; b++ ){
        
    }

    console.log( numberLocations );


    //let positions = Array.from({ length: numberOfBatteries}, (k,v) =>bank.length-v).reverse();
    let max = makeJoltage(bank,positions);
    console.log(bank,positions, max);    
    let curPositionShifting = 0;

    while( curPositionShifting < numberOfBatteries ){
        let currentPosition = positions[curPositionShifting];
        let currentPositionValue = parseInt(bank[currentPosition]);
        //starting at the right most position, work our way left
        let previousShiftingPosition = curPositionShifting -1 >= 0 ? positions[curPositionShifting-1] : 0;
        //stop at first element, or wherever previous position stopped
        let newPosition = currentPosition;
        for( let i = currentPosition; i >= previousShiftingPosition; i--){
            let testPosittionValue = parseInt(bank[i]);
           // console.log(`\t${i}=>${testPosittionValue}`)
            if( testPosittionValue > currentPositionValue ){
                newPosition = i;
                break;
            }
        }
        //console.log( currentPosition, newPosition);
        if( currentPosition != newPosition ){
            positions[curPositionShifting] = newPosition;
            let newJoltage = makeJoltage(bank,positions);
            max = Math.max( max, newJoltage );
        }

        curPositionShifting++;
    }

    //for( let i =)


    return max;
}

function part1( data:string[] ):number {
    return data.map( bank => iteratativeJoltage(bank, 2)).reduce( (acc,cur) => acc + cur, 0 );
}

function part2( data:string[] ):number {
    return data.map( bank => iteratativeJoltage(bank, 12)).reduce( (acc,cur) => acc + cur, 0 );
}

execute([part1, part2], inputs);
//[10100.64ms]	Part1	Example: 357 
//[650.20ms]	Part1	Input: 17445 
//[]	        Part2	Example: 3121910778619 
//[]	        Part2	Input: 