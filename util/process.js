
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function measured( input, fn, data, debug = false ){
    let start = performance.now();
    let response = fn( data );
    let end = performance.now();
    console.log( `[${(end - start).toFixed(2)}ms]\t${capitalize(input)}\t${ capitalize(fn.name)}: ${response} ` );
    if( debug ) debugger;
}

export function execute( functions, inputs, debug = false ){
    functions.forEach( fn => Object.entries(inputs).forEach(e => {
        measured(e[0],fn,e[1], debug);
    }));
}