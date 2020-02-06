import { PrintIntem } from '../../util/printItem';
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';

/*
    auditTime
    
    Ignore for given time then emit most recent value

    When you are interested in ignoring a source observable for a given amout of time, you can use auditTime.
    A possible use case is to only emit certain events (i.e. mouse clicks) at a maximum rate per second.
    After the specified duration has passed, the timer is disabled and the most recent source value is
    emitted on the output Observable, and this process repeats for the next source value.

    💡 If you want the timer to reset whenever a new event occurs on the source observable, you can use debounceTime

*/

// Create observable that emits click events
const source = fromEvent(document, 'click');
// Emit clicks at a rate of at most one click per second
const example = source.pipe(auditTime(1000))
// Output (example): '(1s) --- Clicked --- (1s) --- Clicked' 
const subscribe = example.subscribe(val => PrintIntem.print('Clicked'));

// --------------------------------------------------------------------------------------