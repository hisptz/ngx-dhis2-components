import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { OrgUnitTypes } from '../../constants/org-unit-types.constants';
import { OrgUnit } from '../../models/org-unit.model';
import { Observable } from 'rxjs';
import { OrgUnitFilterConfig } from '../../models/org-unit-filter-config.model';
import { OrgUnitService } from '../../services/org-unit.service';
import { tap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-selection',
  templateUrl: './ngx-dhis2-org-unit-selection.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-selection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxDhis2OrgUnitSelectionComponent implements OnInit {
  @Input() selectedOrgUnits: any[];
  @Input() loadingOrgUnits: boolean;
  @Input() userOrgUnitSelected: boolean;
  @Input() orgUnitFilterConfig: OrgUnitFilterConfig;

  highestLevelOrgUnits$: Observable<OrgUnit[]>;

  @Output() activateOrgUnit = new EventEmitter();
  @Output() deactivateOrgUnit = new EventEmitter();

  constructor(private orgUnitService: OrgUnitService) {}

  ngOnInit() {
    this.highestLevelOrgUnits$ = this.orgUnitService
      .loadUserOrgUnits(this.orgUnitFilterConfig)
      .pipe(
        tap(() => {
          this.loadingOrgUnits = false;
        })
      );
  }

  onActivateOrgUnit(orgUnit: OrgUnit) {
    this.activateOrgUnit.emit({
      ...orgUnit,
      type: OrgUnitTypes.ORGANISATION_UNIT,
    });
  }

  onDeactivateOrgUnit(orgUnit: OrgUnit) {
    this.deactivateOrgUnit.emit({
      ...orgUnit,
      type: OrgUnitTypes.ORGANISATION_UNIT,
    });
  }
}
