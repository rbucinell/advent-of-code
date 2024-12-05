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

function isUpdateCorrect( rules, updates) {

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

function part1( data ){
    const { rules, updates } = parsePages( data);
    const correctUpdates = updates.filter( update => isUpdateCorrect( rules, update ));
    return correctUpdates.reduce( (acc,cur) => acc + cur[Math.floor(cur.length/2)], 0);
}

function part2( data ){
    return 0;
}

execute([part1, part2], inputs);