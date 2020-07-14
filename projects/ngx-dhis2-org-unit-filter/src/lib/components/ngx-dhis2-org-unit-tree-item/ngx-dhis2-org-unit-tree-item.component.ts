import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { getSelectedOrgUnitChildrenCount } from '../../helpers/get-selected-org-unit-children-count.helper';
import { isOrgUnitSelected } from '../../helpers/is-org-unit-selected.helper';
import { OrgUnitFilterConfig } from '../../models/org-unit-filter-config.model';
import { OrgUnit } from '../../models/org-unit.model';
import { OrgUnitService } from '../../services/org-unit.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-tree-item',
  templateUrl: './ngx-dhis2-org-unit-tree-item.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-tree-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxDhis2OrgUnitTreeItemComponent implements OnInit, OnChanges {
  @Input() orgUnit: OrgUnit;
  @Input() expanded: boolean;
  @Input() selectedOrgUnits: any[];
  @Input() parentOrgUnit: any;
  @Input() orgUnitFilterConfig: OrgUnitFilterConfig;

  // events
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  orgUnit$: Observable<OrgUnit>;
  orgUnitChildren$: Observable<OrgUnit[]>;
  selected: boolean;
  selectedChildrenCount: number;

  constructor(private orgUnitService: OrgUnitService) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (
      simpleChanges.selectedOrgUnits &&
      !simpleChanges.selectedOrgUnits.firstChange
    ) {
      this.setOrgUnitProperties();
    }
  }

  ngOnInit() {
    if (this.orgUnit) {
      this.orgUnitChildren$ = this.orgUnit.children
        ? of(this.orgUnit.children)
        : this.orgUnitService.loadChildren(
            this.orgUnit.id,
            this.orgUnit.level,
            this.orgUnitFilterConfig
          );

      this.setOrgUnitProperties(true);
    }
  }

  setOrgUnitProperties(firstTime?: boolean) {
    // get org unit selection status
    this.selected = isOrgUnitSelected(
      this.orgUnit.id,
      this.selectedOrgUnits || []
    );

    this.selectedChildrenCount = getSelectedOrgUnitChildrenCount(
      this.orgUnit.id,
      this.selectedOrgUnits
    );

    if (firstTime) {
      this.expanded = this.selectedChildrenCount > 0 || this.expanded;
    }
  }

  onToggleOrgUnitChildren(e) {
    e.stopPropagation();
    this.expanded = !this.expanded;
  }

  onToggleOrgUnit(orgUnit: OrgUnit) {
    if (_.find(this.selectedOrgUnits, ['id', orgUnit.id])) {
      this.onDeactivateOu(orgUnit);
    } else {
      this.onActivateOu(orgUnit);
    }

    this.selected = !this.selected;
  }

  onDeactivateOu(organisationUnit) {
    this.deactivate.emit(organisationUnit);
  }

  onActivateOu(organisationUnit) {
    this.activate.emit(organisationUnit);
  }

  trackByFn(index, item) {
    return item;
  }
}
