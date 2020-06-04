import { Component, OnInit } from '@angular/core';
import { Fn } from '@iapps/function-analytics';
import { PeriodFilterConfig } from 'projects/ngx-dhis2-period-filter/src/public-api';
@Component({
  selector: 'app-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.scss'],
})
export class PeriodFilterComponent {
  constructor() {
    if (Fn) {
      Fn.init({
        baseUrl: '../../../api/',
      });
    }
  }
  title = 'ngx-dhis2-period-filter';
  periodObject: any;
  action: string;
  periodFilterConfig: PeriodFilterConfig = {
    singleSelection: false,
    emitOnSelection: true,
    childrenPeriodSortOrder: 'ASC',
    allowDateRangeSelection: true,
    allowRelativePeriodSelection: true,
    allowFixedPeriodSelection: true,
    hideActionButtons: true,
    contentHeight: '300px',
  };
  selectedPeriodItems: any[] = [
    {
      id: '201109',
      type: 'Monthly',
      name: 'Genbot 2011',
    },
    {
      id: '201108',
      type: 'Monthly',
      name: 'Miazia 2011',
    },
    {
      id: '201107',
      type: 'Monthly',
      name: 'Megabit 2011',
    },
    {
      id: '201106',
      type: 'Monthly',
      name: 'Yekatit 2011',
    },
  ];

  onPeriodUpdate(periodObject, action) {
    this.periodObject = periodObject;
    this.action = action;
  }
}
