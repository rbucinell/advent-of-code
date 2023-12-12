import { build } from '../../util/input.js';
import { execute } from '../../util/process.js';
let inputs = build(import.meta.url, ['short', 'example', 'input']);

let primes = [2,3,5,7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,101,103,107,109,113,
    127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,
    293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,
    491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,
    701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,
    929,937,941,947,953,967,971,977,983,991,997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 
    1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 
    1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 
    1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 
    1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 
    1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873];

// function* nextPrime(){
//     let i = 0;
//     if( i < primes.length - 1; ){
//         cur = primes.shift();
//         yield cur;
//     }else{
//         cur++;
//         while( cur  )
//     }
// }


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
let memo = {}
function lcm ( a, b ){
    if( [a,b] in memo) return memo[[a,b]];
    let min = a > b ? a : b;
    while(true){
        if( min % a === 0 && min % b === 0 ) break;
        min++
    }
    memo[[a,b]] = min;
    return min;
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
    let paths = Object.keys(nodes).filter( k => k.endsWith('A' )).map( k => {
        return { 'starting': k, 'node': k, 'steps': 0};
    });

    while( !paths.every( p => p.node.endsWith('Z'))){
        for( let path of paths ){
            if( !path.node.endsWith('Z')) {
                path.node = nodes[path.node][instructions[path.steps%instructions.length]];
                path.steps++;
            }
        }
    }
    paths.sort( (a,b) => a.steps - b.steps );
    let steps = paths.map( p => p.steps );
    return paths.reduce( (acc, cur) => lcm(acc,cur.steps), paths[0].steps);




    ////brute force will never finish
    // let steps = 0;
    // while( !paths.every( p => p.endsWith('Z')) ){
    //     paths = paths.map( path => nodes[path][instructions[steps%instructions.length]]);
    //     steps++;
    // }
    // return steps;
}

execute([part2], build(import.meta.url,['part2example']));


execute([part1, part2], inputs);
//Part1: 16343
//Part2: 15299095336639