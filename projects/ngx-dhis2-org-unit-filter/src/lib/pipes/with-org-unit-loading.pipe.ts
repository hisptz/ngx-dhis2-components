import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of, Observable } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Pipe({
  name: 'withOrgUnitLoading',
})
export class WithOrgUnitLoadingPipe implements PipeTransform {
  transform(
    val: any
  ): Observable<{ error: any; loading: boolean; value: any }> {
    return isObservable(val)
      ? val.pipe(
          map((value: any) => ({ loading: false, value })),
          startWith({ loading: true }),
          catchError((error) => of({ loading: false, error }))
        )
      : val;
  }
}
