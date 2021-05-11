import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';

import { DataElementService } from '../../services/data-element.service';
import {
  addDataElements,
  loadDataElements,
  loadDataElementsFail,
  loadDataElementsInitiated
} from '../actions/data-element.actions';
import { DataElementState } from '../reducers/data-element.reducer';
import { getDataElementsInitiatedStatus } from '../selectors/data-element.selectors';

@Injectable()
export class DataElementEffects {
  loadDataElements$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadDataElements),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(
              this.dataElementStore.select(getDataElementsInitiatedStatus)
            )
          )
        ),
        tap(([{}, dataElementInitiated]) => {
          if (!dataElementInitiated) {
            this.dataElementStore.dispatch(loadDataElementsInitiated());
            this.dataElementService.loadAll().subscribe(
              (dataElements: any[]) => {
                this.dataElementStore.dispatch(
                  addDataElements({ dataElements })
                );
              },
              (error: any) => {
                this.dataElementStore.dispatch(loadDataElementsFail(error));
              }
            );
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private dataElementService: DataElementService,
    private dataElementStore: Store<DataElementState>
  ) {}
}
