import { PrintIntem } from '../../util/printItem';
import { delay, mergeMap, take } from 'rxjs/operators';
import { of, fromEvent, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';

/*
    mergeMap / flatMap
    
    Map to observable, emit values

    💡 flatMap is an alias for mergeMap!
    💡 If only one inner subscription should be active at a time, try switchMap!
    💡 If the order of emission and subscription of inner observables is important, try concatMap!

        For instance, when using switchMap each inner subscription is completed when the source emits,
    allowing only one active inner subscription. In contrast, mergeMap allows for multiple inner
    subscriptions to be active at a time. Because of this, one of the most common use-case for mergeMap
    is requests that should not be canceled, think writes rather than reads. Note that if order must be
    maintained concatMap is a better option.
        Be aware that because mergeMap maintains multiple active inner subscriptions at once it's possible to
    create a memory leak through long-lived inner subscriptions. A basic example would be if you were
    mapping to an observable with an inner timer, or a stream of dom events. In these cases, if you still
    wish to utilize mergeMap you may want to take advantage of another operator to manage the completion
    of the inner subscription, think take or takeUntil. You can also limit the number of active inner
    subscriptions at a time with the concurrent parameter, seen in example 5.

*/

// faking network request for save
const saveLocation = location => {
    return of(location).pipe(delay(500));
  };
  // streams
  const click$ = fromEvent(document, 'click');
  
  click$
    .pipe(
      mergeMap((e: MouseEvent) => {
        return saveLocation({
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now()
        });
      })
    )
    // Saved! {x: 98, y: 170, ...}
    .subscribe(r => PrintIntem.print(`Saved!  {x: ${r.x}, y: ${r.y}, timestamp: ${r.timestamp}}`));

// --------------------------------------------------------------------------------------

// // free api url
// const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

// // streams
// const click$ = fromEvent(document, 'click');

// click$
//   .pipe(
//     /*
//      * Using mergeMap for example, but generally for GET requests you will prefer switchMap.
//      * Also, if you do not need the parameter like below you could use mergeMapTo instead.
//      * ex. mergeMapTo(ajax.getJSON(API_URL))
//      */
//     mergeMap(() => ajax.getJSON(API_URL))
//   )
//   // { userId: 1, id: 1, ...}
//   .subscribe((val: any) => PrintIntem.print(`{userId: ${val.userId}, id: ${val.id}, title: ${val.title}, completed: ${val.completed}}`));

// --------------------------------------------------------------------------------------

// // helper to create promise
// const myPromise = val =>
//   new Promise(resolve => resolve(`${val} World From Promise!`));

// // emit 'Hello'
// const source$ = of('Hello');

// // map to promise and emit result
// source$
//   .pipe(mergeMap(val => myPromise(val)))
//   // output: 'Hello World From Promise'
//   .subscribe(PrintIntem.print);

// --------------------------------------------------------------------------------------

// // helper to create promise
// const myPromise = val =>
//   new Promise(resolve => resolve(`${val} World From Promise!`));

// // emit 'Hello'
// const source$ = of('Hello');

// source$
//   .pipe(
//     mergeMap(
//       val => myPromise(val),
//       /*
//       you can also supply a second argument which receives the source value and emitted
//       value of inner observable or promise
//     */
//       (valueFromSource, valueFromPromise) => {
//         return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
//       }
//     )
//   )
//   // output: "Source: Hello, Promise: Hello World From Promise!"
//   .subscribe(PrintIntem.print);

// --------------------------------------------------------------------------------------

// // emit value every 1s
// const source$ = interval(1000);

// source$
//   .pipe(
//     mergeMap(
//       // project
//       val => interval(5000).pipe(take(2)),
//       // resultSelector
//       (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal],
//       // concurrent
//       2
//     )
//   )
//   /*
//         Output:
//         [0, 0, 0, 0] <--1st inner observable
//         [1, 1, 0, 0] <--2nd inner observable

//         [0, 0, 1, 1] <--1st inner observable
//         [1, 1, 1, 1] <--2nd inner observable

//         [2, 2, 0, 0] <--3rd inner observable
//         [3, 3, 0, 0] <--4th inner observable
// */
//   .subscribe(PrintIntem.print);