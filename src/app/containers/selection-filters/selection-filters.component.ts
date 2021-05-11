import { Component, OnInit } from '@angular/core';
import { SelectionFilterConfig } from 'projects/ngx-dhis2-selection-filters/src/public-api';

@Component({
  selector: 'app-selection-filters',
  templateUrl: './selection-filters.component.html',
  styleUrls: ['./selection-filters.component.scss']
})
export class SelectionFiltersComponent implements OnInit {
  selectionFilterConfig: SelectionFilterConfig;
  constructor() {}

  ngOnInit(): void {
    this.selectionFilterConfig = {
      showValidationRuleGroupFilter: false,
      orgUnitFilterConfig: {
        singleSelection: false,
        reportUse: false,
        contentHeight: '370px',
        emitOnSelection: true,
        hideActionButtons: true
      },
      periodFilterConfig: {
        singleSelection: false,
        hideActionButtons: true,
        contentHeight: '355px',
        emitOnSelection: true
      }
    };
  }

  onFilterUpdate(dataSelections: any[]) {
    //console.log(dataSelections);
  }
}
