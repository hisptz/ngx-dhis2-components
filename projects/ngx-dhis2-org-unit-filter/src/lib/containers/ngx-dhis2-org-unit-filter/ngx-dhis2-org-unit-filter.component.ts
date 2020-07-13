import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEFAULT_ORG_UNIT_FILTER_CONFIG } from '../../constants/default-org-unit-filter-config.constant';
import { OrgUnitTypes } from '../../constants/org-unit-types.constants';
import { getOrgUnitSelection } from '../../helpers/get-org-unit-selection.helper';
import { getSelectedOrgUnits } from '../../helpers/get-selected-org-units.helper';
import { OrgUnitFilterConfig } from '../../models/org-unit-filter-config.model';
import { OrgUnitGroup } from '../../models/org-unit-group.model';
import { OrgUnitLevel } from '../../models/org-unit-level.model';
import { OrgUnit } from '../../models/org-unit.model';
import { OrgUnitService } from '../../services/org-unit.service';
import { loadOrgUnitGroups } from '../../store/actions/org-unit-group.actions';
import { loadOrgUnitLevels } from '../../store/actions/org-unit-level.actions';
import { loadOrgUnits } from '../../store/actions/org-unit.actions';
import { OrgUnitFilterState } from '../../store/reducers/org-unit-filter.reducer';
import {
  getOrgUnitGroupBasedOnOrgUnitsSelected,
  getOrgUnitGroupLoading,
} from '../../store/selectors/org-unit-group.selectors';
import {
  getOrgUnitLevelBasedOnOrgUnitsSelected,
  getOrgUnitLevelLoading,
} from '../../store/selectors/org-unit-level.selectors';
import {
  getOrgUnitLoaded,
  getOrgUnitLoading,
  getUserOrgUnitsBasedOnOrgUnitsSelected,
} from '../../store/selectors/org-unit.selectors';

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
  userOrgUnits$: Observable<OrgUnit[]>;
  isAnyUserOrgUnitSelected$: Observable<boolean>;
  loadingOrgUnitLevels$: Observable<boolean>;
  loadingOrgUnitGroups$: Observable<boolean>;
  loadingOrgUnits$: Observable<boolean>;
  orgUnitLoaded$: Observable<boolean>;
  topOrgUnitLevel$: Observable<number>;
  highestLevelOrgUnits$: Observable<OrgUnit[]>;

  @Output() orgUnitUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() orgUnitClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private store: Store<OrgUnitFilterState>,
    private orgUnitService: OrgUnitService
  ) {
    this.selectedOrgUnitItems = [];
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

    this.highestLevelOrgUnits$ = this.orgUnitService.loadUserOrgUnits(
      this.orgUnitFilterConfig
    );

    if (!this.selectedOrgUnitItems) {
      this.selectedOrgUnitItems = [];
    }

    // Dispatching actions to load organisation unit information
    this.store.dispatch(loadOrgUnitLevels());
    this.store.dispatch(loadOrgUnitGroups());
    this.store.dispatch(
      loadOrgUnits({ orgUnitFilterConfig: this.orgUnitFilterConfig })
    );

    // Set organisation unit information
    this._setOrUpdateOrgUnitProperties();
    this.loadingOrgUnitGroups$ = this.store.select(getOrgUnitGroupLoading);
    this.loadingOrgUnitLevels$ = this.store.select(getOrgUnitLevelLoading);
    this.loadingOrgUnits$ = this.store.select(getOrgUnitLoading);
    this.orgUnitLoaded$ = this.store.select(getOrgUnitLoaded);
  }

  ngOnDestroy() {
    if (this.orgUnitFilterConfig.closeOnDestroy) {
      this.onOrgUnitClose();
    }
  }

  private _setOrUpdateOrgUnitProperties() {
    // set or update org unit levels
    this.orgUnitLevels$ = this.store.select(
      getOrgUnitLevelBasedOnOrgUnitsSelected(this.selectedOrgUnitItems)
    );

    // set or update org unit groups
    this.orgUnitGroups$ = this.store.select(
      getOrgUnitGroupBasedOnOrgUnitsSelected(this.selectedOrgUnitItems)
    );

    // set or update user org units
    this.userOrgUnits$ = this.store.select(
      getUserOrgUnitsBasedOnOrgUnitsSelected(this.selectedOrgUnitItems)
    );

    // set or update user org unit selection status
    this.isAnyUserOrgUnitSelected$ = this.userOrgUnits$.pipe(
      map((userOrgUnits: OrgUnit[]) =>
        (userOrgUnits || []).some(
          (userOrgUnit: OrgUnit) => userOrgUnit.selected
        )
      )
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
