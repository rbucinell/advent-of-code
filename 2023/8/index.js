import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url, ['short', 'example', 'input']);

function parse( data ){
    let instructions = data[0].split('');
    let nodes = {};
    for( let i = 2; i < data.length; i++ ){
        let cur = data[i];
        let name = cur.substring(0, cur.indexOf('=')).trim();
        let left = cur.substring(cur.indexOf('(')+1, cur.indexOf(',')).trim();
        let right = cur.substring(cur.indexOf(',')+1, cur.indexOf(')')).trim();
        nodes[name] = { 'L': left, 'R': right }
    }
    return { instructions, nodes };
}

function part1( data ){
    let{ instructions, nodes } = parse( data );
    let pos = 'AAA';
    let steps = 0;
    while( pos != 'ZZZ' )
    {
        pos = nodes[pos][instructions[steps%instructions.length]];
        steps++;
    }
    return steps;

}

//21883 too low
////todo: need to save distance to Z for every given node. then on a give pass, assign distances for a given location
////if all the paths have a known distance, then pick the max. we know its that many more steps away.
function part2( data ){
    let{ instructions, nodes } = parse( data );
    let paths = Object.keys(nodes).filter( k => k.endsWith('A' ));
    let steps = 0;
    while( !paths.every( p => p.endsWith('Z')) ){
        paths = paths.map( path => nodes[path][instructions[steps%instructions.length]]);
        steps++;
    }
    
    return steps;
}

execute([part2], build(import.meta.url,['part2example']));


execute([part1, part2], inputs);