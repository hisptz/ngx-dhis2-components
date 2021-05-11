export function getIndicatorFormulaParameters(indicatorExpression) {
  const formulaParameters: any = [];

  /**
   * Remove outer enclosure first
   */
  indicatorExpression.split(/[()]/).forEach(innerExpression => {
    if (
      innerExpression !== '' &&
      innerExpression.trim() !== '-' &&
      innerExpression.trim() !== '+'
    ) {
      innerExpression.split(/[-+*]/).forEach(expression => {
        // Pick only those which are not numbers
        if (isNaN(parseFloat(expression.trim()))) {
          let expressionObject = {};
          switch (expression.split(/[{}]/)[0]) {
            /**
             * Get parameters for data elements
             */
            case '#': {
              const dataElementExpression = expression.split(/[{}]/)[1];
              expressionObject = {
                id: dataElementExpression,
                metadataType: 'dataElement'
              };
              break;
            }

            /**
             * Get Organisation unit counts
             */
            case 'OUG': {
              expressionObject = {
                id: expression.split(/[{}]/)[1],
                metadataType: 'orgUnitCount'
              };
              break;
            }

            /**
             * Get constants
             */
            case 'C': {
              expressionObject = {
                id: expression.split(/[{}]/)[1],
                metadataType: 'constant'
              };
              break;
            }

            /**
             * Get program attribute values
             */
            case 'A': {
              const program = expression.split(/[{}]/)[1];
              expressionObject = {
                program: program.split('.')[0],
                id: program.split('.')[1],
                metadataType: 'programAttribute'
              };
              break;
            }

            /**
             * Get program indicator values
             */
            case 'I': {
              expressionObject = {
                id: expression.split(/[{}]/)[1],
                metadataType: 'programIndicator'
              };
              break;
            }

            /**
             * Get Program dataleement values
             */
            case 'D': {
              const program = expression.split(/[{}]/)[1];
              expressionObject = {
                program: program.split('.')[0],
                id: program.split('.')[1],
                metadataType: 'dataElement'
              };
              break;
            }
          }

          formulaParameters.push(expressionObject);
        }
      });
    }
  });

  return formulaParameters;
}
