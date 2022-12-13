import {read} from '../../util/input.js'
let [example,input] = ['example','input'].map( i => read( 2022, 11, i ));
//console.log( input );

class Monkey {
    constructor( id, startingItems=[], opOperator, opValue, testCond, trueId, falseId){
        this.id = id;
        this.items = startingItems;
        this.trueId = trueId;
        this.falseId = falseId;
        this.opOperator = opOperator;
        this.opValue = opValue;
        this.testCond = testCond;
        this.inspectCount = 0;

        if(opValue === 'old' )
        {
            this.opOperator = '^';
            this.opValue = 2;
        }
    }

    inspect( item )
    {
        this.inspectCount++;
        return this.testFn( item );
    }

    test( item )
    {
        return item % BigInt(this.testCond) === 0 ? this.trueId : this.falseId;
    }

    testFn(params) {
        if( this.opValue === 'old')
            params = this.opValue;
        switch( this.opOperator ){
            case '+': return params + BigInt(this.opValue);
            case '*': return params * BigInt(this.opValue);
            case '/': return params / BigInt(this.opValue);
            case '-': return params - BigInt(this.opValue);
            case '^': return params * params;
        }
    }
}

function parseMonkies( input )
{
    let monkeys = [];
    for( let i = 0; i < input.length; i+=7)
    {
        let id = input[i].charAt('Monkey '.length);
        let items = input[i+1].substring(`Starting items: `.length+2).split(' ').map( m => BigInt(parseInt(m.trim())));
        let operation = input[i+2].substring(`Operation: new = old `.length+1).trim().split(' ');
        let divisibleBy = parseInt(input[i+3].substring(`Test: divisible by `.length+1).trim())
        let trueMonk =parseInt(input[i+4].charAt(input[i+4].length-1));
        let falseMonk =parseInt(input[i+5].charAt(input[i+5].length-1));
        monkeys.push( new Monkey(id,items,operation[0],operation[1],divisibleBy,trueMonk,falseMonk))
    }
    return monkeys;
}

/**
 * 
 * @param {Array} monkeys 
 * @param {int} rounds 
 */
function monkeyBusiness( input, rounds )
{
    let monkeys = parseMonkies( input );
    let lcm = monkeys.reduce( (acc,cur) => acc * cur.testCond , 1);
    for( let r = 0; r < rounds; r++ )
    {
        monkeys.forEach((monkey,m) => {
            let itemCount = monkey.items.length;
            for( let i = 0; i < itemCount; i++)
            {
                let item = monkey.items.shift();
                item = monkey.inspect( item );
                item = item /3n;
                //item%=BigInt(lcm);
                let newMonkey = monkey.test(item);
                monkeys[newMonkey].items.push( item );
            }
        });

        //output monkeys at end of round
        // monkeys.forEach((monkey,m) => {
        //     console.log( `Monkey ${monkey.id}: ${monkey.items.join(', ')}`)
        // });
    }
    monkeys.sort( (a, b) => b.inspectCount - a.inspectCount );
    return monkeys[0].inspectCount * monkeys[1].inspectCount;

}

const calculateLCM = (...arr) => {
    const gcd2 = (a, b) => {
       // Greatest common divisor of 2 integers
       if(!b) return b===0 ? a : NaN;
          return gcd2(b, a%b);
    };
    const lcm2 = (a, b) => {
       // Least common multiple of 2 integers
       return a * b / gcd2(a, b);
    }
    // Least common multiple of a list of integers
    let n = 1;
    for(let i = 0; i < arr.length; ++i){
       n = lcm2(arr[i], n);
    }
    return n;
 };

console.log(`part1: ${monkeyBusiness(example, 20)}`);
console.log(`part1: ${monkeyBusiness(input, 20)}`);