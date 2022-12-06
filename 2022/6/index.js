import fs from 'fs';

let input = fs.readFileSync(`./2022/6/input.txt`, 'utf8').toString().trim().split(/\r?\n/);
input = input[0]; //only 1 line

function findStartOfMessageMarker( encodedMessage, markerLength )
{
    let answer = 0;
    for( let i = markerLength; i < encodedMessage.length; i++)
    {
        let set = new Set();
        for( let s=0; s< markerLength; s++)
        {
            set.add( encodedMessage[i-s] );
        }
        if( set.size === markerLength)
        {
            answer = i+1;
            break;
        }
    }
    return answer;
}

//examples
let examples = ['bvwbjplbgvbhsrlpgdmjqwftvncz', 'nppdvjthqldpwncqszvftbrmjlhg', 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw']
examples.forEach( ex => console.log( `Example ${ex}: ${findStartOfMessageMarker(ex,4)}`)); //5,6,10,11


console.log( `Day 6 Part 1: ${ findStartOfMessageMarker(input,4)}`);  //part 1: 1598
console.log( `Day 6 Part 2: ${ findStartOfMessageMarker(input,14)}`); //part 2: 2414