import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Store } from '@ngrx/store';
import { uniqBy, isPlainObject, find, slice, omit, filter, flattenDeep } from 'lodash';
import {map as _map} from 'lodash';
import {
  getCurrentDataFilterGroup,
  getDataFilterLoadingStatus
} from '../../store/selectors/data-filter.selectors';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { addMembersToGroups } from '../../helpers/add-members-to-group.helper';
import { getDataFilterSelectionsBasedOnConfig } from '../../helpers/get-data-filter-selections-based-on-config.helper';
import { getDataGroupBasedOnDataItem } from '../../helpers/get-data-group-based-on-data-item.helper';
import { removeAllMembersFromGroups } from '../../helpers/remove-all-members-from-groups.helper';
import { removeMemberFromGroup } from '../../helpers/remove-member-from-group.helper';
import { updateDataGroupInList } from '../../helpers/update-data-group-in-list.helper';
import { ARROW_LEFT_ICON, ARROW_RIGHT_ICON, LIST_ICON } from '../../icons';
import { DataFilterConfig } from '../../models/data-filter-config.model';
import { DataFilterSelection } from '../../models/data-filter-selection.model';
import { DataGroup } from '../../models/data-group.model';
import { DataFilterState } from '../../store/reducers/data-filter.reducer';
import {
  getDataFilterGroups,
  getDataFilterItems
} from '../../store/selectors/data-filter.selectors';
import {
  setCurrentDataFilterGroup,
  updateActiveDataFilterSelections,
  loadDataFilters
} from '../../store/actions/data-filter.actions';
import { filterByName } from '../../helpers/filter-by-name.helper';
import { defaultDataFilterConfig } from '../../constants/data-filter-config.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.css']
})
export class DataFilterComponent implements OnInit, OnDestroy {
  @Input()
  selectedItems: any[] = [];

  @Input()
  selectedGroups: any[] = [];

  @Input()
  dataFilterConfig: DataFilterConfig;

  @Input()
  currentUser: any;

  @Input()
  dataGroupPreferences: {
    maximumNumberOfGroups: number;
    maximumItemPerGroup: number;
    ignoreMaximumRestrictions: boolean;
  };

  dataGroups: any[] = [];

  @Output()
  update: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  close: EventEmitter<any> = new EventEmitter<any>();

  showGroupingPanel: boolean;
  selectedItems$: Observable<any>;
  querystring: string;
  dataItemSearchTerm: string;
  showBody = false;
  currentPageForAvailableDataItems = 1;
  currentPageForSelectedDataItems = 1;

  selectedGroupId: string;

  dataFilterSelections: DataFilterSelection[];
  showGroups: boolean;

  // icons
  icons: { [name: string]: string };

  dataFilterGroups$: Observable<any[]>;
  currentDataFilterGroup$: Observable<any>;
  dataFilterItems$: Observable<any[]>;
  dataFilterLoading$: Observable<boolean>;
  selectedItemsList = [];
  deselectedItemsList = [];

  constructor(private dataFilterStore: Store<DataFilterState>) {
    // Set default data group preferences
    this.dataGroupPreferences = {
      maximumNumberOfGroups: 0,
      maximumItemPerGroup: 0,
      ignoreMaximumRestrictions: false
    };

    this.dataFilterLoading$ = dataFilterStore.select(
      getDataFilterLoadingStatus
    );

    this.showGroups = false;

    this.icons = { LIST_ICON, ARROW_LEFT_ICON, ARROW_RIGHT_ICON };

    this.showGroupingPanel = false;
  }

  ngOnInit() {
    // Set default data filter preferences
    this.dataFilterConfig = {
      ...defaultDataFilterConfig,
      ...(this.dataFilterConfig || {})
    };

    // Initialize selected items
    if (!this.selectedItems || isPlainObject(this.selectedItems)) {
      this.selectedItems = [];
    }
    // Load data filter items
    this.dataFilterStore.dispatch(
      loadDataFilters({ currentUser: this.currentUser })
    );
    // set data filter selections
    this.dataFilterSelections = getDataFilterSelectionsBasedOnConfig(
      this.dataFilterConfig
    );

    // Set show group status based on preferences
    this.showGroupingPanel =
      this.dataFilterConfig && this.dataFilterConfig.showGroupsOnStartup;

    this.dataFilterGroups$ = this.dataFilterStore.select(
      getDataFilterGroups(this.dataFilterSelections)
    );

    this.currentDataFilterGroup$ = this.dataFilterStore.select(
      getCurrentDataFilterGroup(this.dataFilterSelections)
    );

    this.dataFilterItems$ = this.dataFilterStore.select(
      getDataFilterItems(this.dataFilterSelections)
    );
  }

  // trigger this to reset pagination pointer when search change
  onDataItemsSearch(e) {
    e.stopPropagation();
    this.currentPageForAvailableDataItems = 1;
  }

  onSetDataFilterGroup(dataFilterGroup: any, e) {
    e.stopPropagation();
    this.dataFilterStore.dispatch(
      setCurrentDataFilterGroup({
        currentDataFilterGroupId: dataFilterGroup.id
      })
    );
    this.showGroups = false;
  }

  // this will add a selected item in a list function
  onSelectDataItem(item: any, e) {
    e.stopPropagation();
    if (this.dataFilterConfig.singleSelection) {
      this.onDeselectAllItems();
    }

    if (!find(this.selectedItems, ['id', item.id])) {
      this.selectedItems =
        this.dataGroupPreferences &&
        this.dataGroupPreferences.maximumItemPerGroup &&
        this.dataGroupPreferences.maximumNumberOfGroups
          ? slice(
              [...this.selectedItems, item],
              0,
              this.dataGroupPreferences.maximumItemPerGroup *
                this.dataGroupPreferences.maximumNumberOfGroups
            )
          : [...this.selectedItems, item];

      // Also add members into groups
      this.selectedGroups = addMembersToGroups(
        this.selectedGroups,
        this.selectedGroupId,
        this.selectedItems,
        this.dataGroupPreferences
      );
    }
  }

  onUpdateDataItem(dataItem: any) {
    const dataItemIndex = this.selectedItems.indexOf(
      find(this.selectedItems, ['id', dataItem ? dataItem.id : ''])
    );

    if (dataItemIndex !== -1) {
      this.selectedItems = [
        ...slice(this.selectedItems, 0, dataItemIndex),
        dataItem,
        ...slice(this.selectedItems, dataItemIndex + 1)
      ];
    }
  }

  // Remove selected Item
  onRemoveDataItem(dataItemDetails: { dataItem: any; group?: DataGroup }, e?) {
    if (e) {
      e.stopPropagation();
    }

    const removedItem = find(this.selectedItems, [
      'id',
      dataItemDetails && dataItemDetails.dataItem
        ? dataItemDetails.dataItem.id
        : undefined
    ]);

    const itemIndex = this.selectedItems.indexOf(removedItem);

    if (itemIndex !== -1) {
      this.selectedItems = [
        ...this.selectedItems.slice(0, itemIndex),
        ...this.selectedItems.slice(itemIndex + 1)
      ];

      const dataGroup =
        dataItemDetails.group ||
        getDataGroupBasedOnDataItem(this.selectedGroups, removedItem);

      if (dataGroup) {
        // Also remove item from the group
        this.selectedGroups = updateDataGroupInList(
          this.selectedGroups,
          removeMemberFromGroup(dataGroup, removedItem)
        );
      }
    }
  }

  // selecting all items
  onSelectAllItems(event) {
    event.stopPropagation();

    this.dataFilterItems$
      .pipe(
        map((dataFilterItems: any[]) =>
          filterByName(dataFilterItems, this.dataItemSearchTerm)
        ),
        take(1)
      )
      .subscribe((dataFilterItems: any[]) => {
        const newSelectedItems = uniqBy(
          [...this.selectedItems, ...dataFilterItems],
          'id'
        );
        this.selectedItems =
          this.dataGroupPreferences &&
          this.dataGroupPreferences.maximumItemPerGroup &&
          this.dataGroupPreferences.maximumNumberOfGroups
            ? slice(
                newSelectedItems,
                0,
                this.dataGroupPreferences.maximumItemPerGroup *
                  this.dataGroupPreferences.maximumNumberOfGroups
              )
            : newSelectedItems;

        if (this.dataFilterConfig.singleSelection) {
          this.selectedItems = [this.selectedItems[0]];
        }

        this.selectedGroups = addMembersToGroups(
          this.selectedGroups,
          this.selectedGroupId,
          this.selectedItems,
          this.dataGroupPreferences
        );
      });
  }

  // selecting all items
  onDeselectAllItems(e?) {
    if (e) {
      e.stopPropagation();
    }
    this.selectedItems = [];

    this.selectedGroups = removeAllMembersFromGroups(this.selectedGroups);
  }

  emit() {
    return {
      items: this.selectedItems,
      groups: filter(
        this.selectedGroups.map((dataGroup: any) => {
          return omit(dataGroup, ['current']);
        }),
        (dataGroup: DataGroup) => dataGroup.name !== ''
      ),
      dimension: 'dx',
      changed: true
    };
  }

  onClose(e) {
    e.stopPropagation();
    this.close.emit(this.emit());
  }

  onDataFilterUpdate(e) {
    e.stopPropagation();
    this.update.emit(this.emit());
  }

  onToggleDataFilterSelection(toggledDataFilterSelection, event) {
    event.stopPropagation();
    const multipleSelection = event.ctrlKey ? true : false;
    this.dataFilterSelections = this.dataFilterSelections.map(
      (dataFilterSelection: any) => {
        return {
          ...dataFilterSelection,
          selected:
            toggledDataFilterSelection.prefix === 'all'
              ? dataFilterSelection.prefix !== 'all'
                ? false
                : !dataFilterSelection.selected
              : toggledDataFilterSelection.prefix === dataFilterSelection.prefix
              ? !dataFilterSelection.selected
              : multipleSelection
              ? dataFilterSelection.prefix === 'all'
                ? false
                : dataFilterSelection.selected
              : false
        };
      }
    );

    this.dataFilterStore.dispatch(
      updateActiveDataFilterSelections({
        dataFilterSelections: this.dataFilterSelections
      })
    );

    this.currentPageForAvailableDataItems = 1;
    this.dataItemSearchTerm = '';
  }

  toggleDataFilterGroupList(e) {
    e.stopPropagation();
    this.showGroups = !this.showGroups;
  }

  onToggleGroupingPanel(e) {
    e.stopPropagation();
    this.showGroupingPanel = !this.showGroupingPanel;
  }

  onDataGroupsUpdate(dataGroups) {
    this.selectedGroups = [...dataGroups];
  }

  onSelectedGroupIdUpdate(selectedGroupId: string) {
    this.selectedGroupId = selectedGroupId;
  }

  onUpdateSelectedItems(selectedItems: any[]) {
    this.selectedItems = [...selectedItems];
  }

  ngOnDestroy() {
    this.close.emit(this.emit());
  }
  isInArray(arr: any[], id) {
    const item = find(arr || [], (arrItem) => arrItem.id === id) || '';
    return item ? true : false;
  }

  onClickToSelectData(dataFilterItem, dataFilterItems, e, type) {
    if (
      this.dataFilterConfig &&
      this.dataFilterConfig.hasOwnProperty('singleSelection') &&
      !this.dataFilterConfig.singleSelection
    ) {
      const { ctrlKey, shiftKey } = e;
      e.stopPropagation();
      switch (type) {
        case 'SELECT': {
          this.updateSelectedItemsList(dataFilterItem,dataFilterItems, ctrlKey, shiftKey);
          break;
        }
        case 'DESELECT': {
          this.updateDeselectedItemsList(dataFilterItem, dataFilterItems, ctrlKey, shiftKey);
          break;
        }

        default:
          break;
      }
    } else {
      switch (type) {
        case 'SELECT': {
          this.updateSingleSelectedPeriodList(dataFilterItem);
          break;
        }
        case 'DESELECT': {
          this.updateSingleDeselectedPeriodList(dataFilterItem);
          break;
        }

        default:
          break;
      }

    }
  }
  updateSelectedItemsList(item, dataFilterItems, ctrlKey, shiftKey) {
    console.log({item, ctrlKey, shiftKey, selected: this.selectedItems, dataFilterItems});
    if ((ctrlKey && shiftKey) || shiftKey) {
      const itemIndex =
        item && item.hasOwnProperty('id') && dataFilterItems
          ? dataFilterItems.findIndex(
              (availableItem) => availableItem.id === item.id
            ) || 0
          : 0;

      this.selectedItemsList =
        dataFilterItems && dataFilterItems.length >= 0
          ? uniqBy(
              [
                ...this.selectedItemsList,
                ...dataFilterItems.slice(0, itemIndex + 1),
              ],
              'id'
            ) || this.selectedItemsList
          : [];
    } else if (ctrlKey) {
      const itemInList =
        item && item.hasOwnProperty('id')
          ? find(
              this.selectedItems || [],
              (selectedItem) => selectedItem.id === item.id
            )
          : null;
      this.selectedItemsList =
        itemInList && itemInList.hasOwnProperty('id')
          ? filter(
              this.selectedItemsList || [],
              (periodListItem) => periodListItem.id !== itemInList.id
            ) || this.selectedItemsList
          : [...this.selectedItemsList, item];
    } else {
      this.selectedItemsList = [...[], item];
    }
  }
  updateDeselectedItemsList(item, dataFilterItems, ctrlKey, shiftKey) {

    if ((ctrlKey && shiftKey) || shiftKey) {
      const itemIndex =
      item && item.hasOwnProperty('id') && dataFilterItems
        ? dataFilterItems.findIndex(
            (availableItem) => availableItem.id === item.id
          ) || 0
        : 0;

      this.deselectedItemsList =
        this.selectedItems && this.selectedItems.length >= 0
          ? uniqBy(
              [
                ...this.deselectedItemsList,
                ...this.selectedItems.slice(0, itemIndex + 1),
              ],
              'id'
            ) || this.deselectedItemsList
          : [];
    } else if (ctrlKey) {
      const itemInList =
        item && item.hasOwnProperty('id')
          ? find(
              this.deselectedItemsList || [],
              (deselectedPeriod) => deselectedPeriod.id === item.id
            )
          : null;
      this.deselectedItemsList =
      itemInList && itemInList.hasOwnProperty('id')
          ? filter(
              this.deselectedItemsList || [],
              (dataListItem) => dataListItem.id !== itemInList.id
            ) || this.deselectedItemsList
          : [...this.deselectedItemsList, item];
    } else {
      this.deselectedItemsList = [...[], item];
    }

  }
  updateSingleSelectedPeriodList(dataFilterItem) {

  }
  updateSingleDeselectedPeriodList(dataFilterItem) {

  }
  moveSingleSelectedDataItem(item, e) {
    this.onSelectDataItem(item, e);
    this.selectedItemsList = [];
 }
 moveSingleDeselectedDataItem(dataItem, e) {
   this.onRemoveDataItem({dataItem}, e);
   this.deselectedItemsList = [];
}
  moveSelectedItems(e) {
    this.selectedItemsList = flattenDeep(
      _map(this.selectedItemsList || [], (dataItem) => {
        this. onSelectDataItem(dataItem, e);
        const itemMoved =
          dataItem && dataItem.hasOwnProperty('id') && dataItem.id
            ? find(
                this.selectedItems || [],
                (selectedItem) => selectedItem.id === dataItem.id
              )
            : null;
        return itemMoved ? [] : dataItem;
      }) || []
    );
  }
  moveDeselectedItems(e) {
    this.deselectedItemsList = flattenDeep(
      _map(this.deselectedItemsList || [], (dataItem) => {
        this.onRemoveDataItem({dataItem}, e);
        const itemMoved =
          dataItem && dataItem.hasOwnProperty('id') && dataItem.id
            ? find(
                this.selectedItems || [],
                (selectedItem) => selectedItem.id === dataItem.id
              )
            : null;
        return itemMoved ? dataItem : [];
      }) || []
    );
  }
}
