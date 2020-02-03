import { PrintIntem } from "../../util/printItem";
import { interval, timer, Observable, throwError, of } from 'rxjs';
import { map, retryWhen, tap, delayWhen, mergeMap, finalize, catchError } from 'rxjs/operators';

/*
    retryWhen
    
    Retry an observable sequence on error based on custom criteria
*/

//emit value every 1s
const source = interval(1000);
const example = source.pipe(
  map(val => {
    if (val > 5) {
      //error will be picked up by retryWhen
      throw val;
    }
    return val;
  }),
  retryWhen(errors =>
    errors.pipe(
      //log error message
      tap(val => PrintIntem.print(`Value ${val} was too high!`)),
      //restart in 6 seconds
      delayWhen(val => timer(val * 1000))
    )
  )
);
/*
  output:
  0
  1
  2
  3
  4
  5
  "Value 6 was too high!"
  --Wait 6 seconds then repeat
*/
const subscribe = example.subscribe(val => PrintIntem.print(val));

// --------------------------------------------------------------------------------------

// const genericRetryStrategy = ({
//     maxRetryAttempts = 3,
//     scalingDuration = 1000,
//     excludedStatusCodes = []
//   }: {
//     maxRetryAttempts?: number,
//     scalingDuration?: number,
//     excludedStatusCodes?: number[]
//   } = {}) => (attempts: Observable<any>) => {
//     return attempts.pipe(
//       mergeMap((error, i) => {
//         const retryAttempt = i + 1;
//         // if maximum number of retries have been met
//         // or response is a status code we don't wish to retry, throw error
//         if (
//           retryAttempt > maxRetryAttempts ||
//           excludedStatusCodes.find(e => e === error.status)
//         ) {
//           return throwError(error);
//         }
//         PrintIntem.print(
//           `Attempt ${retryAttempt}: retrying in ${retryAttempt *
//             scalingDuration}ms`
//         );
//         // retry after 1s, 2s, etc...
//         return timer(retryAttempt * scalingDuration);
//       }),
//       finalize(() => PrintIntem.print('We are done!'))
//     );
//   };

//   this._appService
//       .getData(500)
//       .pipe(
//         retryWhen(genericRetryStrategy()),
//         catchError(error => of(error))
//       )
//       .subscribe(PrintIntem.print);

//     // excluding status code, delay for logging clarity
//     setTimeout(() => {
//     this._appService
//       .getData(500)
//       .pipe(
//         retryWhen(genericRetryStrategy({
//           scalingDuration: 2000,
//           excludedStatusCodes: [500]
//         })),
//         catchError(error => of(error))
//       )
//       .subscribe(e => PrintIntem.print(`Exluded code:, ${e.status}`));

//     }, 8000);