import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url);

function parsePages( data ){
    let rules = [];
    let updates = [];
    let gap = false;
    for( let d of data ){
        if( d === ''){
            gap = true;
            continue;
        }
        if( !gap ){
            let [before, after] = d.split('|').map( _ => parseInt( _ ));
            if( before in rules) {
                rules[before].push( after );
            }else{
                rules[before] = [ after ];
            }
        }else{
            updates.push( d.split(',').map( _ => parseInt( _ )) );
        }
    }
    return { rules, updates };
}

function isUpdatesCorrect( rules, updates) {
    for( let i = 0; i < updates.length; i++ ) {
        const update = updates[i];
        if( !(update in rules) ) continue;

        let uRules = rules[update];

        for( let u = 0; u <= i; u++){
            const update = updates[u];
            if( uRules.includes(update) ){
                return false;
            }
        }
    }
    return true;
}

function getMinimumIndex( rule,  arr ) {
    let minIndex = Math.min(...
        rule.map( r => arr.indexOf( r ) )
            .filter( r => r !== -1));
    return minIndex;
}

function fixUpdatesByRules( rules, updates ) {
    do {
        for( let update of updates ){
            let index = updates.indexOf( update );
            let minIndex = getMinimumIndex(rules[update], updates);
            if( index != minIndex ) {
                updates.splice(minIndex,0,...updates.splice(index,1));
            }
        }
    }while( !isUpdatesCorrect(rules, updates));
    return updates;
}

function part1( data ){
    const { rules, updates } = parsePages( data );
    const correctUpdates = updates.filter( update => isUpdatesCorrect( rules, update ));
    return correctUpdates.reduce( (acc,cur) => acc + cur[Math.floor(cur.length/2)], 0);
}

function part2( data ){
    const { rules, updates } = parsePages( data);
    const inCorrectUpdates = updates.filter( update => !isUpdatesCorrect( rules, update ));
    const fixedRules = inCorrectUpdates.map( _ => fixUpdatesByRules( rules, _ ));    
    return inCorrectUpdates.reduce( (acc,cur) => acc + cur[Math.floor(cur.length/2)], 0);
}
execute([part1, part2], inputs);
//[0.19ms]	Part1	Example: 143 
//[1.14ms]	Part1	Input: 5166 
//[0.13ms]	Part2	Example: 123 
//[4.53ms]	Part2	Input: 4679 