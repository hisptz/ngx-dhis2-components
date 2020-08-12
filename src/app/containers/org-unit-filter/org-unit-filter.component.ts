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
    singleSelection: true,
    reportUse: false,
    emitOnSelection: true,
    hideActionButtons: true,
    minLevel: 5,
  };
  selectedOrgUnitItems: any[] = [
    {
      id: '52c9be7e2e159',
      name: 'AICC Hospital at District Level',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onOrgUnitUpdate(orgUnitObject, action) {
    this.orgUnitObject = orgUnitObject;
    this.action = action;
  }
}
