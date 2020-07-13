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
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { isOrgUnitSelected } from '../../helpers/is-org-unit-selected.helper';
import { OrgUnit } from '../../models/org-unit.model';
import { OrgUnitFilterState } from '../../store/reducers/org-unit-filter.reducer';
import {
  getOrgUnitById,
  getSelectedOrgUnitChildrenCount,
} from '../../store/selectors/org-unit.selectors';
import { OrgUnitService } from '../../services/org-unit.service';
import { OrgUnitFilterConfig } from '../../models/org-unit-filter-config.model';

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
  selectedChildrenCount$: Observable<number>;

  constructor(
    private store: Store<OrgUnitFilterState>,
    private orgUnitService: OrgUnitService
  ) {}

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
            this.orgUnitFilterConfig
          );

      this.setOrgUnitProperties(true);
    }
  }

  setOrgUnitProperties(firstChange?: boolean) {
    // get org unit selection status
    this.selected = isOrgUnitSelected(
      this.orgUnit.id,
      this.selectedOrgUnits || []
    );

    // Get count of selected children for this organisation unit
    this.selectedChildrenCount$ = this.store.select(
      getSelectedOrgUnitChildrenCount(
        this.orgUnit.id,
        this.selectedOrgUnits || []
      )
    );
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
