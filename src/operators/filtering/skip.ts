import { PrintIntem } from '../../util/printItem';
import { interval, from } from 'rxjs';
import { skip, filter } from 'rxjs/operators';

/*
    skip
    
    Skip the provided number of emitted values

    Skip allows you to ignore the first x emissions from the source. Generally skip is used when you have
    an observable that always emits certain values on subscription that you wish to ignore. Perhaps those
    first few aren't needed or you are subscribing to a Replay or BehaviorSubject and do not need to act
    on the initial values. Reach for skip if you are only concerned about later emissions.

    You could mimic skip by using filter with indexes. Ex. .filter((val, index) => index > 1)

*/

// //emit every 1s
// const source = interval(1000);
// //skip the first 5 emitted values
// const example = source.pipe(skip(5));
// //output: 5...6...7...8........
// const subscribe = example.subscribe(PrintIntem.print);

// --------------------------------------------------------------------------------------

const numArrayObs = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 3,4,5...
const skipObs = numArrayObs.pipe(skip(2)).subscribe(PrintIntem.print);

// 3,4,5...
const filterObs = numArrayObs
  .pipe(filter((val, index) => index > 1))
  .subscribe(PrintIntem.print);

//Same output!