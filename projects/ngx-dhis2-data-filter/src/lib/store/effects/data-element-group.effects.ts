import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';

import { DataElementGroupService } from '../../services/data-element-group.service';
import {
  addDataElementGroups,
  loadDataElementGroups,
  loadDataElementGroupsFail,
  loadDataElementGroupsInitiated
} from '../actions/data-element-group.actions';
import { DataElementGroupState } from '../reducers/data-element-group.reducer';
import { getDataElementGroupsInitiatedStatus } from '../selectors/data-element-group.selectors';

@Injectable()
export class DataElementGroupEffects {
  loadDataElementGroups$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadDataElementGroups),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(
              this.dataElementGroupStore.select(
                getDataElementGroupsInitiatedStatus
              )
            )
          )
        ),
        tap(([{}, dataElementGroupInitiated]) => {
          if (!dataElementGroupInitiated) {
            this.dataElementGroupStore.dispatch(
              loadDataElementGroupsInitiated()
            );
            this.dataElementGroupService.loadAll().subscribe(
              (dataElementGroups: any[]) => {
                this.dataElementGroupStore.dispatch(
                  addDataElementGroups({ dataElementGroups })
                );
              },
              (error: any) => {
                this.dataElementGroupStore.dispatch(
                  loadDataElementGroupsFail(error)
                );
              }
            );
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private dataElementGroupService: DataElementGroupService,
    private dataElementGroupStore: Store<DataElementGroupState>
  ) {}
}
