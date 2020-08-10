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
    emitOnSelection: true,
    reportUse: false,
  };
  selectedOrgUnitItems: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  onOrgUnitUpdate(orgUnitObject, action) {
    this.orgUnitObject = orgUnitObject;
    this.action = action;
  }
}
