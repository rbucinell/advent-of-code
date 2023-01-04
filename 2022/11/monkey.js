export default class Monkey {
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