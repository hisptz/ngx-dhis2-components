import { map, flatten, find } from 'lodash';
import { FunctionRule } from '../models/function-rule.model';

export function getStandardizedFunctionRulesFromFunctionList(
  functionList,
  ruleId: string = ''
): FunctionRule[] {
  const functionRules = flatten(
    map(functionList || [], (functionObject: any) => functionObject.rules)
  );

  return map(functionRules, (functionRule: any, functionRuleIndex: number) => {
    const selectedRule = find(functionRules, [
      'id',
      ruleId !== '' ? ruleId : functionRuleIndex === 0 ? functionRule.id : ''
    ]);
    return {
      ...functionRule,
      type: 'FUNCTION_RULE',
      selected: selectedRule && selectedRule.id === functionRule.id
    };
  });
}
