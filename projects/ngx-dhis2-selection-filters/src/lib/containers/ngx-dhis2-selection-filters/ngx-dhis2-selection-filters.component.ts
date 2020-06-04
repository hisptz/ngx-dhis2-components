import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { getDataElementsFromIndicators } from '../../helpers/get-data-elements-from-indicators.helper';
import { getLayout } from '../../helpers/get-layout.helper';
import { updateSelectionFilterConfig } from '../../helpers/update-selection-filter-config.helper';
import { SelectionFilterConfig } from '../../models/selected-filter-config.model';
import { SelectionDialogComponent } from '../../components/selection-dialog/selection-dialog.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-selection-filters',
  templateUrl: './ngx-dhis2-selection-filters.component.html',
  styleUrls: ['./ngx-dhis2-selection-filters.component.css'],
})
export class NgxDhis2SelectionFiltersComponent implements OnInit {
  @Input()
  dataSelections: any[];
  @Input()
  layout: any;
  @Input()
  selectionFilterConfig: SelectionFilterConfig;

  @Output()
  selectionFilterUpdate: EventEmitter<any[]> = new EventEmitter<any[]>();

  showFilters: boolean;
  showFilterBody: boolean;
  selectedFilter: string;

  // selections
  selectedData: any[];
  selectedDynamicDimensions: any[];
  selectedDataGroups: any[];
  selectedValidationDataElements: any[];
  selectedValidationRuleGroups: Array<{ id: string; name: string }>;
  lowestPeriodType: string;
  selectedPeriods: any[];
  selectedOrgUnits: any[];

  constructor(private dialog: MatDialog) {
    this.showFilters = this.showFilterBody = false;
  }

  ngOnInit() {
    // initialize data Selections
    if (!this.dataSelections || !_.isArray(this.dataSelections)) {
      this.dataSelections = [];
    }

    // set selection paremeters
    this._setSelectionParameters();

    // set current filter
    this.selectedFilter = this.selectionFilterConfig.showDataFilter
      ? 'DATA'
      : this.selectionFilterConfig.showPeriodFilter
      ? 'PERIOD'
      : this.selectionFilterConfig.showOrgUnitFilter
      ? 'ORG_UNIT'
      : this.selectionFilterConfig.showLayout
      ? 'VALIDATIONRULEGROUP'
      : this.selectionFilterConfig.showValidationRuleGroupFilter
      ? 'LAYOUT'
      : '';
  }

  onOpenFilter(e) {
    e.stopPropagation();
    const selectionDialog = this.dialog.open(SelectionDialogComponent, {
      width: '50%',
      data: {
        dataSelections: this.dataSelections,
        selectionFilterConfig: this.selectionFilterConfig,
      },
    });

    selectionDialog.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  toggleCurrentFilter(e, selectedFilter) {
    e.stopPropagation();
    if (this.selectedFilter === selectedFilter) {
      this.selectedFilter = '';
      this.showFilterBody = false;
    } else {
      this.selectedFilter = selectedFilter;
      this.showFilterBody = true;
    }
  }

  onFilterClose(selectedItems, selectedFilter) {
    if (selectedFilter === 'LAYOUT') {
      const layouts = _.flatten(
        _.map(_.keys(selectedItems), (selectedItemKey: string) => {
          return _.map(
            selectedItems[selectedItemKey],
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

      this.dataSelections = _.sortBy(
        _.map(this.dataSelections || [], (dataSelection: any) => {
          const availableDataSelectionLayout = _.find(layouts, [
            'value',
            dataSelection.dimension,
          ]);

          return availableDataSelectionLayout
            ? {
                ...dataSelection,
                layout: availableDataSelectionLayout.layout,
                layoutOrder: availableDataSelectionLayout.layoutOrder,
              }
            : dataSelection;
        }),
        'layoutOrder'
      );
    } else {
      if (selectedItems) {
        if (_.isArray(selectedItems)) {
          // Remove all dynamic dimension selections first
          this.dataSelections = _.filter(
            this.dataSelections || [],
            (dataSelection: any) =>
              ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(
                dataSelection.dimension
              ) !== -1
          );
          _.each(selectedItems, (selectedItem: any) => {
            this.dataSelections = !_.find(this.dataSelections, [
              'dimension',
              selectedItem.dimension,
            ])
              ? [
                  ...(this.dataSelections || []),
                  {
                    ...selectedItem,
                    layout:
                      selectedItem.layout || getLayout(selectedItem.dimension),
                  },
                ]
              : [
                  ...this.updateDataSelectionWithNewSelections(
                    this.dataSelections || [],
                    selectedItem
                  ),
                ];
          });
        } else if (selectedItems.items.length > 0) {
          this.dataSelections = !_.find(this.dataSelections, [
            'dimension',
            selectedItems.dimension,
          ])
            ? [
                ...(this.dataSelections || []),
                {
                  ...selectedItems,
                  layout:
                    selectedItems.layout || getLayout(selectedItems.dimension),
                },
              ]
            : [
                ...this.updateDataSelectionWithNewSelections(
                  this.dataSelections || [],
                  selectedItems
                ),
              ];
        }
      }
    }

    // set selection paremeters
    this._setSelectionParameters();

    if (this.selectedFilter === selectedFilter) {
      this.selectedFilter = '';
      this.showFilterBody = false;
    }
  }

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

      this.dataSelections = _.sortBy(
        _.map(this.dataSelections || [], (dataSelection: any) => {
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
        this.dataSelections = _.filter(
          this.dataSelections || [],
          (dataSelection: any) =>
            ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(dataSelection.dimension) !==
            -1
        );
        _.each(selectedItems, (selectedItem: any) => {
          this.dataSelections = !_.find(this.dataSelections, [
            'dimension',
            selectedItem.dimension,
          ])
            ? [
                ...(this.dataSelections || []),
                {
                  ...selectedItem,
                  layout:
                    selectedItem.layout || getLayout(selectedItem.dimension),
                },
              ]
            : [
                ...this.updateDataSelectionWithNewSelections(
                  this.dataSelections || [],
                  selectedItem
                ),
              ];
        });
      } else {
        this.dataSelections = !_.find(this.dataSelections, [
          'dimension',
          selectedItems.dimension,
        ])
          ? [
              ...(this.dataSelections || []),
              {
                ...selectedItems,
                layout:
                  selectedItems.layout || getLayout(selectedItems.dimension),
              },
            ]
          : [
              ...this.updateDataSelectionWithNewSelections(
                this.dataSelections || [],
                selectedItems
              ),
            ];
      }
    }

    // set selection paremeters
    this._setSelectionParameters();

    this.selectionFilterUpdate.emit(this.dataSelections || []);
    this.selectedFilter = '';
    this.showFilterBody = false;
  }

  updateDataSelectionWithNewSelections(
    dataSelections: any[],
    selectedObject: any
  ): any[] {
    const selectedDimension = _.find(dataSelections, [
      'dimension',
      selectedObject.dimension,
    ]);
    const selectedDimensionIndex = selectedDimension
      ? dataSelections.indexOf(selectedDimension)
      : -1;
    return selectedDimension
      ? [
          ...dataSelections.slice(0, selectedDimensionIndex),
          { ...selectedDimension, ...selectedObject },
          ...dataSelections.slice(selectedDimensionIndex + 1),
        ]
      : dataSelections
      ? [...dataSelections, selectedObject]
      : [selectedObject];
  }

  private _setSelectionParameters() {
    // set selection filter configuration
    this.selectionFilterConfig = updateSelectionFilterConfig(
      this.selectionFilterConfig,
      this.dataSelections
    );
    // set data items
    const dataObject = _.find(this.dataSelections, ['dimension', 'dx']);
    this.selectedData = dataObject ? dataObject.items : [];

    // set dynamic dimennsion
    this.selectedDynamicDimensions = _.filter(
      this.dataSelections || [],
      (dataSelection: any) =>
        ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(dataSelection.dimension) === -1
    );

    // set data groups
    this.selectedDataGroups = dataObject ? dataObject.groups : [];

    // set validation rule group
    const validationRuleGroupObject = _.find(this.dataSelections, [
      'dimension',
      'vrg',
    ]);
    this.selectedValidationRuleGroups = validationRuleGroupObject
      ? validationRuleGroupObject.items
      : [];

    // set periods
    const periodObject = _.find(this.dataSelections, ['dimension', 'pe']);
    this.selectedPeriods = periodObject ? periodObject.items : [];

    // set org units
    const orgUnitObject = _.find(this.dataSelections, ['dimension', 'ou']);
    this.selectedOrgUnits = orgUnitObject ? orgUnitObject.items : [];

    // set validation data elements
    this.selectedValidationDataElements = getDataElementsFromIndicators(
      dataObject ? dataObject.items : []
    );

    // set lowest period type
    const validationRuleGroup = _.find(this.dataSelections, [
      'dimension',
      'vrg',
    ]);
    this.lowestPeriodType =
      validationRuleGroup && validationRuleGroup.periodType
        ? validationRuleGroup.periodType.id
        : '';

    // set layout
    const layoutItem = _.groupBy(
      _.map(this.dataSelections, (dataSelection) => {
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
