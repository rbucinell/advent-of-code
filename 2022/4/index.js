import fs from 'fs'
const input = fs.readFileSync('./2022/4/input.txt', 'utf8')
    .split('\n')
    .map(row => row.split(',')
    .map(pair=> pair.split('-')
));
console.log(input);

function compareRanges( range1, range2 )
{
    range1 = range1.map( r => parseInt(r));
    range2 = range2.map( r => parseInt(r));

    let range1Length = range1[1] - range1[0];
    let range2Length = range2[1] - range2[0];

    let [smaller, larger] = range1Length <= range2Length ? [range1,range2] : [range2,range1];

    return ( larger[0] <= smaller[0] && larger[1]>= smaller[1]) ? 1:0;
}

function anyOverlap( range1, range2 )
{
    range1 = range1.map( r => parseInt(r));
    range2 = range2.map( r => parseInt(r));

    let [left,right] = range1[0] <= range2[0] ? [range1,range2] : [range2,range1];
    return ( right[0] <= left[1]) ? 1 : 0;
}

console.log( 'Part 1', input.reduce( (sum,cur)=> sum + compareRanges(cur[0],cur[1]), 0)); //part 1 solve: 550
console.log( 'Part 2', input.reduce( (sum,cur)=> sum + anyOverlap(cur[0],cur[1]), 0)); //part 2 solve: 931