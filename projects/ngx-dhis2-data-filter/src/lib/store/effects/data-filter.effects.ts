import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { loadDataElementGroups } from '../actions/data-element-group.actions';
import { loadDataElements } from '../actions/data-element.actions';
import { loadDataFilters } from '../actions/data-filter.actions';
import { loadFunctions } from '../actions/function.actions';
import { loadIndicatorGroups } from '../actions/indicator-group.actions';
import { loadIndicators } from '../actions/indicator.actions';

@Injectable()
export class DataFilterEffects {
  loadDataFilters$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDataFilters),
      switchMap(({ currentUser }) => [
        loadFunctions({ currentUser }),
        loadIndicatorGroups(),
        loadIndicators(),
        loadDataElementGroups(),
        loadDataElements()
      ])
    )
  );
  constructor(private actions$: Actions) {}
}
