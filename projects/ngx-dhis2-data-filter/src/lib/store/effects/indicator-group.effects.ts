import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';

import { IndicatorGroupService } from '../../services/indicator-group.service';
import {
  addIndicatorGroups,
  loadIndicatorGroups,
  loadIndicatorGroupsFail,
  loadIndicatorGroupsInitiated
} from '../actions/indicator-group.actions';
import { IndicatorGroupState } from '../reducers/indicator-group.reducer';
import { getIndicatorGroupsInitiatedStatus } from '../selectors/indicator-group.selectors';

@Injectable()
export class IndicatorGroupEffects {
  loadIndicatorGroups$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadIndicatorGroups),
        concatMap(action =>
          of(action).pipe(
            withLatestFrom(
              this.indicatorGroupStore.select(getIndicatorGroupsInitiatedStatus)
            )
          )
        ),
        tap(([{}, indicatorGroupInitiated]) => {
          if (!indicatorGroupInitiated) {
            this.indicatorGroupStore.dispatch(loadIndicatorGroupsInitiated());
            this.indicatorGroupService.loadAll().subscribe(
              (indicatorGroups: any[]) => {
                this.indicatorGroupStore.dispatch(
                  addIndicatorGroups({ indicatorGroups })
                );
              },
              (error: any) => {
                this.indicatorGroupStore.dispatch(
                  loadIndicatorGroupsFail({ error })
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
    private indicatorGroupService: IndicatorGroupService,
    private indicatorGroupStore: Store<IndicatorGroupState>
  ) {}
}
