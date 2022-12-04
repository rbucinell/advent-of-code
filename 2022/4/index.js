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

    if( larger[0] <= smaller[0] && larger[1]>= smaller[1]) return 1;
    return 0;
}

console.log( input.reduce( (sum,cur)=> sum + compareRanges(cur[0],cur[1]), 0)); //part 1 solve: 550