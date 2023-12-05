export function measured( input, fn, data ){
    let start = performance.now();
    let response = fn( data );
    let end = performance.now();
    console.log( `[${(end - start).toFixed(2)}ms]\t${input}\t${ fn.name }: ${ response} ` );
}

export function execute( functions, inputs ){
    functions.forEach( fn => Object.entries(inputs).forEach(e => measured(e[0],fn,e[1])));
}