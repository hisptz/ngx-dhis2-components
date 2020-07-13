import { Component, OnInit } from '@angular/core';
import { OrgUnitFilterConfig } from 'projects/ngx-dhis2-org-unit-filter/src/public-api';

@Component({
  selector: 'app-org-unit-filter',
  templateUrl: './org-unit-filter.component.html',
  styleUrls: ['./org-unit-filter.component.scss'],
})
export class OrgUnitFilterComponent implements OnInit {
  title = 'app';
  orgUnitObject: any;
  action: string;
  orgUnitFilterConfig: OrgUnitFilterConfig = {
    singleSelection: false,
    showUserOrgUnitSection: true,
    showOrgUnitLevelGroupSection: true,
    showOrgUnitGroupSection: true,
    showOrgUnitLevelSection: true,
    reportUse: false,
    additionalQueryFields: ['dataSets'],
    batchSize: 400,
    hideActionButtons: true,
    contentHeight: '500px',
    emitOnSelection: true,
  };
  selectedOrgUnitItems: any[] = [
    { id: 'O6uvpzGd5pu', name: 'Bo', level: 3 },
    {
      id: 'OU_GROUP.AQQCxQqDxLe',
      name: 'Konta CHP',
      level: 4,
    },
    {
      id: 'LEVEL-1',
      name: 'Kukuna CHP',
      level: 4,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onOrgUnitUpdate(orgUnitObject, action) {
    this.orgUnitObject = orgUnitObject;
    this.action = action;
  }
}
