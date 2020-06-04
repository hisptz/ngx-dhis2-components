import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { getLayout } from '../../helpers/get-layout.helper';
import { updateSelectionFilterConfig } from '../../helpers/update-selection-filter-config.helper';
import { getDataElementsFromIndicators } from '../../helpers/get-data-elements-from-indicators.helper';
import { updateDataSelections } from '../../helpers/update-data-selections.helpers';

@Component({
  selector: 'lib-selection-dialog',
  templateUrl: './selection-dialog.component.html',
  styleUrls: ['./selection-dialog.component.scss'],
})
export class SelectionDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onFilterUpdate(selectedItems, selectedFilter) {
    if (selectedFilter === 'LAYOUT') {
      const layouts = _.flatten(
        _.map(_.keys(selectedItems), (selectedItemKey: string) => {
          return _.map(
            selectedItems[selectedItemKey] || [],
            (selectedItem: any, selectedItemIndex: number) => {
              return {
                ...selectedItem,
                layout: selectedItemKey,
                layoutOrder: selectedItemIndex,
              };
            }
          );
        })
      );

      this.data.dataSelections = _.sortBy(
        _.map(this.data.dataSelections || [], (dataSelection: any) => {
          const availableDataSelectionLayout = _.find(layouts, [
            'value',
            dataSelection.dimension,
          ]);

          return availableDataSelectionLayout
            ? {
                ...dataSelection,
                changed: true,
                layout: availableDataSelectionLayout.layout,
                layoutOrder: availableDataSelectionLayout.layoutOrder,
              }
            : { ...dataSelection, changed: true };
        }),
        'layoutOrder'
      );
    } else {
      if (_.isArray(selectedItems)) {
        // Remove all dynamic dimension selections first
        this.data.dataSelections = _.filter(
          this.data.dataSelections || [],
          (dataSelection: any) =>
            ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(dataSelection.dimension) !==
            -1
        );
        _.each(selectedItems, (selectedItem: any) => {
          this.data.dataSelections = !_.find(this.data.dataSelections, [
            'dimension',
            selectedItem.dimension,
          ])
            ? [
                ...(this.data.dataSelections || []),
                {
                  ...selectedItem,
                  layout:
                    selectedItem.layout || getLayout(selectedItem.dimension),
                },
              ]
            : [
                ...updateDataSelections(
                  this.data.dataSelections || [],
                  selectedItem
                ),
              ];
        });
      } else {
        this.data.dataSelections = !_.find(this.data.dataSelections, [
          'dimension',
          selectedItems.dimension,
        ])
          ? [
              ...(this.data.dataSelections || []),
              {
                ...selectedItems,
                layout:
                  selectedItems.layout || getLayout(selectedItems.dimension),
              },
            ]
          : [
              ...updateDataSelections(
                this.data.dataSelections || [],
                selectedItems
              ),
            ];
      }
    }

    // set selection paremeters
    this._setSelectionParameters();
  }

  onUpdate(e) {
    e.stopPropagation();
    this.dialogRef.close(this.data.dataSelections);
  }

  private _setSelectionParameters() {
    // set selection filter configuration
    this.data.selectionFilterConfig = updateSelectionFilterConfig(
      this.data.selectionFilterConfig,
      this.data.dataSelections
    );
    // set data items
    const dataObject = _.find(this.data.dataSelections, ['dimension', 'dx']);
    this.data.selectedData = dataObject ? dataObject.items : [];

    // set dynamic dimennsion
    this.data.selectedDynamicDimensions = _.filter(
      this.data.dataSelections || [],
      (dataSelection: any) =>
        ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(dataSelection.dimension) === -1
    );

    // set data groups
    this.data.selectedDataGroups = dataObject ? dataObject.groups : [];

    // set validation rule group
    const validationRuleGroupObject = _.find(this.data.dataSelections, [
      'dimension',
      'vrg',
    ]);
    this.data.selectedValidationRuleGroups = validationRuleGroupObject
      ? validationRuleGroupObject.items
      : [];

    // set periods
    const periodObject = _.find(this.data.dataSelections, ['dimension', 'pe']);
    this.data.selectedPeriods = periodObject ? periodObject.items : [];

    // set org units
    const orgUnitObject = _.find(this.data.dataSelections, ['dimension', 'ou']);
    this.data.selectedOrgUnits = orgUnitObject ? orgUnitObject.items : [];

    // set validation data elements
    this.data.selectedValidationDataElements = getDataElementsFromIndicators(
      dataObject ? dataObject.items : []
    );

    // set lowest period type
    const validationRuleGroup = _.find(this.data.dataSelections, [
      'dimension',
      'vrg',
    ]);
    this.data.lowestPeriodType =
      validationRuleGroup && validationRuleGroup.periodType
        ? validationRuleGroup.periodType.id
        : '';

    // set layout
    const layoutItem = _.groupBy(
      _.map(this.data.dataSelections, (dataSelection) => {
        return {
          name: dataSelection.name,
          value: dataSelection.dimension,
          layout: dataSelection.layout,
        };
      }),
      'layout'
    );
  }
}
