import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DEFAULT_ORG_UNIT_FILTER_CONFIG } from '../../constants/default-org-unit-filter-config.constant';
import { OrgUnitTypes } from '../../constants/org-unit-types.constants';
import { USER_ORG_UNITS } from '../../constants/user-org-units.constants';
import { getOrgUnitGroupsWithSelected } from '../../helpers/get-org-unit-groups-with-selected.helper';
import { getOrgUnitLevelBySelectedOrgUnits } from '../../helpers/get-org-unit-level-by-selected-org-unit.helper';
import { getOrgUnitSelection } from '../../helpers/get-org-unit-selection.helper';
import { getSelectedOrgUnits } from '../../helpers/get-selected-org-units.helper';
import { updateOrgUnitListWithSelectionStatus } from '../../helpers/update-org-unit-list-with-selection-status.helper';
import { OrgUnitFilterConfig } from '../../models/org-unit-filter-config.model';
import { OrgUnitGroup } from '../../models/org-unit-group.model';
import { OrgUnitLevel } from '../../models/org-unit-level.model';
import { OrgUnit } from '../../models/org-unit.model';
import { OrgUnitGroupService } from '../../services/org-unit-group.service';
import { OrgUnitLevelService } from '../../services/org-unit-level.service';
import { OrgUnitService } from '../../services/org-unit.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-org-unit-filter',
  templateUrl: './ngx-dhis2-org-unit-filter.component.html',
  styleUrls: ['./ngx-dhis2-org-unit-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxDhis2OrgUnitFilterComponent implements OnInit, OnDestroy {
  @Input() selectedOrgUnitItems: any[];
  @Input() orgUnitFilterConfig: OrgUnitFilterConfig;

  orgUnitLevels$: Observable<OrgUnitLevel[]>;
  orgUnitGroups$: Observable<OrgUnitGroup[]>;
  userOrgUnits: OrgUnit[];
  isAnyUserOrgUnitSelected: boolean;
  loadingOrgUnitLevels: boolean;
  loadingOrgUnitGroups: boolean;
  loadingOrgUnits: boolean;
  topOrgUnitLevel$: Observable<number>;
  highestLevelOrgUnits$: Observable<OrgUnit[]>;
  selectedOrgUnits$: Observable<OrgUnit[]>;

  @Output() orgUnitUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() orgUnitClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private orgUnitService: OrgUnitService,
    private orgUnitLevelService: OrgUnitLevelService,
    private orgUnitGroupService: OrgUnitGroupService
  ) {
    this.selectedOrgUnitItems = [];
    this.loadingOrgUnits = true;
    this.loadingOrgUnitLevels = true;
    this.loadingOrgUnitGroups = true;
  }

  get selectedOrgUnits(): any[] {
    return getSelectedOrgUnits(this.selectedOrgUnitItems);
  }

  ngOnInit() {
    // Set orgUnit filter configuration
    this.orgUnitFilterConfig = {
      ...DEFAULT_ORG_UNIT_FILTER_CONFIG,
      ...(this.orgUnitFilterConfig || {}),
    };

    this.highestLevelOrgUnits$ = this.orgUnitService
      .loadUserOrgUnits(this.orgUnitFilterConfig)
      .pipe(
        tap(() => {
          this.loadingOrgUnits = false;
        })
      );

    if (!this.selectedOrgUnitItems) {
      this.selectedOrgUnitItems = [];
    }

    // Set organisation unit information
    this._setOrUpdateOrgUnitProperties();
  }

  ngOnDestroy() {
    if (this.orgUnitFilterConfig.closeOnDestroy) {
      this.onOrgUnitClose();
    }
  }

  private async _setOrUpdateOrgUnitProperties() {
    this.selectedOrgUnits$ =
      this.selectedOrgUnits.length > 0
        ? this.orgUnitService.loadByIds(
            this.selectedOrgUnits.map((orgUnit: OrgUnit) => orgUnit.id),
            this.orgUnitFilterConfig
          )
        : of([]);

    const selectedOrgUnits = await this.selectedOrgUnits$.toPromise();

    // set or update org unit levels
    this.orgUnitLevels$ = this.orgUnitLevelService.loadAll().pipe(
      map((orgUnitLevels: OrgUnitLevel[]) =>
        getOrgUnitLevelBySelectedOrgUnits(
          orgUnitLevels,
          selectedOrgUnits,
          this.selectedOrgUnitItems
        )
      ),
      tap(() => {
        this.loadingOrgUnitLevels = false;
      })
    );

    // set or update org unit groups
    this.orgUnitGroups$ = this.orgUnitGroupService.loadAll().pipe(
      map((orgUnitGroups: OrgUnitGroup[]) =>
        getOrgUnitGroupsWithSelected(orgUnitGroups, this.selectedOrgUnitItems)
      ),
      tap(() => {
        this.loadingOrgUnitGroups = false;
      })
    );

    // set or update user org units
    this.userOrgUnits = updateOrgUnitListWithSelectionStatus(
      USER_ORG_UNITS,
      this.selectedOrgUnitItems
    );

    // set or update user org unit selection status
    this.isAnyUserOrgUnitSelected = (this.userOrgUnits || []).some(
      (userOrgUnit: OrgUnit) => userOrgUnit.selected
    );
  }

  onSelectOrgUnit(orgUnit: any) {
    if (orgUnit.type === OrgUnitTypes.ORGANISATION_UNIT_LEVEL) {
      this.selectedOrgUnitItems = [
        ..._.filter(
          this.selectedOrgUnitItems || [],
          (selectedOrgUnitItem) =>
            selectedOrgUnitItem.type !== OrgUnitTypes.ORGANISATION_UNIT_GROUP
        ),
        orgUnit,
      ];
    } else if (orgUnit.type === OrgUnitTypes.ORGANISATION_UNIT_GROUP) {
      this.selectedOrgUnitItems = [
        ..._.filter(
          this.selectedOrgUnitItems || [],
          (selectedOrgUnitItem) =>
            selectedOrgUnitItem.type !== OrgUnitTypes.ORGANISATION_UNIT_LEVEL
        ),
        orgUnit,
      ];
    } else {
      this.selectedOrgUnitItems = !this.orgUnitFilterConfig.singleSelection
        ? [
            ...(orgUnit.type === OrgUnitTypes.USER_ORGANISATION_UNIT
              ? _.filter(
                  this.selectedOrgUnitItems || [],
                  (selectedOrgUnitItem) =>
                    selectedOrgUnitItem.type ===
                    OrgUnitTypes.USER_ORGANISATION_UNIT
                )
              : this.selectedOrgUnitItems),
            orgUnit,
          ]
        : [
            ...(orgUnit.type === OrgUnitTypes.USER_ORGANISATION_UNIT
              ? []
              : _.filter(
                  this.selectedOrgUnitItems || [],
                  (selectedOrgUnit) => selectedOrgUnit.type !== orgUnit.type
                )),
            orgUnit,
          ];
    }

    // Also update organisation units
    this._setOrUpdateOrgUnitProperties();

    if (this.orgUnitFilterConfig.emitOnSelection) {
      this.onOrgUnitUpdate();
    }
  }

  onDeselectOrgUnit(orgUnit: any) {
    const orgUnitIndex = this.selectedOrgUnitItems.indexOf(
      _.find(this.selectedOrgUnitItems, ['id', orgUnit.id])
    );

    this.selectedOrgUnitItems =
      orgUnitIndex !== -1
        ? !this.orgUnitFilterConfig.singleSelection
          ? [
              ..._.slice(this.selectedOrgUnitItems || [], 0, orgUnitIndex),
              ..._.slice(this.selectedOrgUnitItems || [], orgUnitIndex + 1),
            ]
          : orgUnit.type === OrgUnitTypes.ORGANISATION_UNIT_LEVEL ||
            orgUnit.type === OrgUnitTypes.ORGANISATION_UNIT_GROUP
          ? [
              ..._.slice(this.selectedOrgUnitItems || [], 0, orgUnitIndex),
              ..._.slice(this.selectedOrgUnitItems || [], orgUnitIndex + 1),
            ]
          : []
        : this.selectedOrgUnitItems || [];

    // Also remove org unit levels if not applicable
    const highestLevel = _.min(
      this.selectedOrgUnitItems
        .map((selectedOrgUnit: any) => selectedOrgUnit.level)
        .filter((selectedOrgUnitLevel) => selectedOrgUnitLevel)
    );

    if (highestLevel) {
      this.selectedOrgUnitItems = this.selectedOrgUnitItems.filter(
        (selectedOrgUnit: any) => {
          if (selectedOrgUnit.type !== OrgUnitTypes.ORGANISATION_UNIT_LEVEL) {
            return selectedOrgUnit;
          }

          const splitedOrgUnitIds = (selectedOrgUnit.id || '').split('-');
          return parseInt(splitedOrgUnitIds[1], 10) >= highestLevel;
        }
      );
    } else {
      this.selectedOrgUnitItems = this.selectedOrgUnitItems.filter(
        (selectedOrgUnit: any) =>
          selectedOrgUnit.type !== OrgUnitTypes.ORGANISATION_UNIT_LEVEL
      );
    }

    // Also update organisation units
    this._setOrUpdateOrgUnitProperties();

    if (this.orgUnitFilterConfig.emitOnSelection) {
      this.onOrgUnitUpdate();
    }
  }

  onDeselectAllOrgUnits() {
    this.selectedOrgUnitItems = [];

    // Also update organisation units
    this._setOrUpdateOrgUnitProperties();

    if (this.orgUnitFilterConfig.emitOnSelection) {
      this.onOrgUnitUpdate();
    }
  }

  onOrgUnitClose() {
    this.orgUnitClose.emit(getOrgUnitSelection(this.selectedOrgUnitItems));
  }

  onOrgUnitUpdate() {
    this.orgUnitUpdate.emit(getOrgUnitSelection(this.selectedOrgUnitItems));
  }

  onClose(e) {
    e.stopPropagation();
    this.onOrgUnitClose();
  }

  onUpdate(e) {
    e.stopPropagation();
    this.onOrgUnitUpdate();
  }
}
