import { omit } from 'lodash';
import { getInitialFunctionStructure } from './get-initial-function-structure.helper';
import { FunctionObject } from '../models/function.model';

export function prepareFunctionForSaving(
  functionObject: FunctionObject,
  contextPath: string,
  currentUser: any
) {
  if (!functionObject) {
    return null;
  }

  const initialFunctionObjectForSaving = getInitialFunctionStructure(
    functionObject,
    contextPath
  );

  return omit(
    initialFunctionObjectForSaving.isNew
      ? {
          ...initialFunctionObjectForSaving,
          created: initialFunctionObjectForSaving.lastUpdated,
          user: currentUser
            ? {
                id: currentUser.id
              }
            : null
        }
      : initialFunctionObjectForSaving,
    ['selected', 'active', 'isNew', 'simulating', 'saving']
  );
}
