import { PrintIntem } from '../../util/printItem';
import { interval, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

/*
    mapTo
    
    Map emissions to constant value

*/

// //emit value every two seconds
// const source = interval(2000);
// //map all emissions to one value
// const example = source.pipe(mapTo('HELLO WORLD!'));
// //output: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
// const subscribe = example.subscribe(PrintIntem.print);

// --------------------------------------------------------------------------------------

//emit every click on document
const source = fromEvent(document, 'click');
//map all emissions to one value
const example = source.pipe(mapTo('GOODBYE WORLD!'));
//output: (click)'GOODBYE WORLD!'...
const subscribe = example.subscribe(PrintIntem.print);