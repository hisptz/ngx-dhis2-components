import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { addFunctionRules } from '../actions/function-rule.actions';
import { addFunctions } from '../actions/function.actions';

@Injectable()
export class FunctionRuleEffects {
  addFunctions$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(addFunctions),
      map(({ functionRules }) => addFunctionRules({ functionRules }))
    )
  );
  constructor(private actions$: Actions) {}
}
