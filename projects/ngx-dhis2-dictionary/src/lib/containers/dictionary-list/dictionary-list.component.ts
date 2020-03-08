import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, pipe } from 'rxjs';

import { MetadataDictionary } from '../../models/dictionary.model';
import { ExportService } from '../../services/export.service';
import { InitializeDictionaryMetadataAction } from '../../store/actions/dictionary.actions';
import { DictionaryState } from '../../store/reducers/dictionary.reducer';
import { AppState } from '../../store/reducers/indicators.reducers';
import { getDictionaryList } from '../../store/selectors/dictionary.selectors';
import {
  getAllIndicators,
  getIndicatorGroups,
  getListOfIndicators
} from '../../store/selectors/indicators.selectors';
import { IndicatorGroupsState } from '../../store/state/indicators.state';
import {
  loadIndicatorsAction,
  LoadIndicatorGroupsAction
} from '../../store/actions/indicators.actions';
import { DictionaryConfig } from '../../models/dictionary-config.model';
import { DICTIONARY_CONFIG } from '../../constants/dictionary-config.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryListComponent implements OnInit {
  @Input() metadataIdentifiers: Array<string>;
  @Input() selectedItem: string;
  @Input() dictionaryConfig: DictionaryConfig;

  @Output() dictionaryItemId = new EventEmitter<any>();
  @Output() metadataInfo = new EventEmitter<any>();
  @Output() metadataGroupsInfo = new EventEmitter<any>();
  dictionaryList$: Observable<MetadataDictionary[]>;
  indicatorGroups$: Observable<IndicatorGroupsState>;
  activeItem: number;
  indicators: any[] = [];
  newIndicators$: Observable<any>;
  searchingText: string;
  currentPage: number;
  indicatorsList$: Observable<any>;
  allIndicators$: Observable<any>;
  completedPercent: number;
  selectedIndicator: any = null;
  totalAvailableIndicators: any = null;
  indicatorGroups: any[] = [];
  error: boolean;
  loading: boolean;
  listAllMetadataInGroup: boolean;
  html: any;
  isPrintSet: boolean;

  constructor(
    private store: Store<DictionaryState>,
    private indicatorsStore: Store<AppState>,
    private exportService: ExportService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.listAllMetadataInGroup = false;
    this.searchingText = '';
    this.indicators = [];
    this.loading = true;
    this.error = false;
    this.currentPage = 1;
    this.completedPercent = 0;
    this.isPrintSet = false;

    this.dictionaryConfig = {
      ...DICTIONARY_CONFIG,
      ...(this.dictionaryConfig || {})
    };

    this.selectedIndicator =
      this.selectedItem || this.metadataIdentifiers
        ? this.metadataIdentifiers[0]
        : undefined;

    if (
      this.metadataIdentifiers &&
      this.metadataIdentifiers.length > 0 &&
      this.metadataIdentifiers[0] !== ''
    ) {
      this.store.dispatch(
        new InitializeDictionaryMetadataAction(this.metadataIdentifiers)
      );

      this.dictionaryList$ = this.store.select(
        getDictionaryList(this.metadataIdentifiers)
      );
    } else if (this.selectedIndicator === 'all') {
      this.loadAllIndicators();
    }
  }

  loadedMetadataInfo(metadata) {
    this.metadataInfo.emit(metadata);
  }

  metadataGroups(groups) {
    this.metadataGroupsInfo.emit(groups);
  }

  selectedMetadataId(identifier) {
    this.selectedIndicator = identifier;
    let identifiers = [];
    if (_.indexOf(this.metadataIdentifiers, identifier) < 0) {
      this.metadataIdentifiers.push(identifier);
    }
    identifiers = _.uniq(this.metadataIdentifiers);
    this.store.dispatch(
      new InitializeDictionaryMetadataAction(this.metadataIdentifiers)
    );

    this.dictionaryList$ = this.store.select(getDictionaryList(identifiers));
    let objToEmit = {
      selected: this.selectedIndicator,
      otherSelectedIds: this.metadataIdentifiers
    };
    this.dictionaryItemId.emit(objToEmit);
  }

  setActiveItem(dictionaryItemId, e?) {
    if (e) {
      e.stopPropagation();
    }

    this.listAllMetadataInGroup = false;

    this.selectedMetadataId(dictionaryItemId);
    this.selectedIndicator = dictionaryItemId;
    this.metadataIdentifiers.push(dictionaryItemId);
    this.metadataIdentifiers = _.uniq(this.metadataIdentifiers);
    if (this.selectedIndicator === 'all') {
      this.loadAllIndicators();
      let objToEmit = {
        selected: 'all',
        otherSelectedIds: this.metadataIdentifiers
      };
      this.dictionaryItemId.emit(objToEmit);
    } else {
      let objToEmit = {
        selected: this.selectedIndicator,
        otherSelectedIds: this.metadataIdentifiers
      };
      this.dictionaryItemId.emit(objToEmit);
    }
  }

  getSafeHtml(html) {
    let safeHtml;
    safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return safeHtml;
  }

  remove(itemId, allIdentifiers) {
    this.listAllMetadataInGroup = false;
    let identifiers = [];
    allIdentifiers.subscribe(identifiersInfo => {
      if (identifiersInfo.length > 0) {
        identifiersInfo.forEach(identifier => {
          if (
            itemId !== identifier.id &&
            identifier.name.indexOf('not found') < 0
          ) {
            identifiers.push(identifier.id);
          }
        });
      }
    });
    this.metadataIdentifiers = _.uniq(identifiers);
    if (this.metadataIdentifiers.length == 0) {
      this.selectedIndicator = 'all';
      this.loadAllIndicators();
      let objToEmit = {
        selected: 'all',
        otherSelectedIds: []
      };
      this.dictionaryItemId.emit(objToEmit);
    } else {
      this.selectedIndicator = this.metadataIdentifiers[
        this.metadataIdentifiers.length - 1
      ];
      let objToEmit = {
        selected: this.selectedIndicator,
        otherSelectedIds: this.metadataIdentifiers
      };
      this.dictionaryItemId.emit(objToEmit);
      this.store.dispatch(
        new InitializeDictionaryMetadataAction(this.metadataIdentifiers)
      );

      this.dictionaryList$ = this.store.select(
        getDictionaryList(this.metadataIdentifiers)
      );
    }
  }

  loadAllIndicators() {
    this.indicatorsList$ = this.indicatorsStore.select(
      pipe(getListOfIndicators)
    );
    if (this.indicatorsList$) {
      this.indicatorsList$.subscribe(indicatorList => {
        if (indicatorList) {
          this.totalAvailableIndicators = indicatorList['pager']['total'];
          this.allIndicators$ = this.indicatorsStore.select(
            pipe(getAllIndicators)
          );
          this.allIndicators$.subscribe(indicatorsLoaded => {
            if (indicatorsLoaded) {
              this.indicators = [];
              _.map(indicatorsLoaded, indicatorsByPage => {
                this.indicators = [...this.indicators, ...indicatorsByPage];
                this.completedPercent =
                  100 *
                  (this.indicators.length / this.totalAvailableIndicators);
                if (this.completedPercent === 100) {
                  this.loading = false;
                  this.error = false;
                }
              });
            }
          });
        } else {
          this.store.dispatch(new loadIndicatorsAction());
          this.store.dispatch(new LoadIndicatorGroupsAction());
          this.indicatorsList$ = this.indicatorsStore.select(
            pipe(getListOfIndicators)
          );
          this.allIndicators$ = this.indicatorsStore.select(
            pipe(getAllIndicators)
          );
          if (this.indicatorsList$) {
            this.indicatorsList$.subscribe(indicatorList => {
              if (indicatorList) {
                this.totalAvailableIndicators = indicatorList['pager']['total'];
                this.allIndicators$.subscribe(indicatorsLoaded => {
                  if (indicatorsLoaded) {
                    this.indicators = [];
                    _.map(indicatorsLoaded, indicatorsByPage => {
                      this.indicators = [
                        ...this.indicators,
                        ...indicatorsByPage['indicators']
                      ];
                      this.completedPercent =
                        100 *
                        (this.indicators.length /
                          this.totalAvailableIndicators);
                      if (this.completedPercent === 100) {
                        this.loading = false;
                        this.error = false;
                      }
                    });
                  }
                });
              }
            });
          }

          this.indicatorGroups$ = this.indicatorsStore.pipe(
            select(getIndicatorGroups)
          );
          if (this.indicatorGroups$) {
            this.indicatorGroups$.subscribe(indicatorGroups => {
              if (indicatorGroups) {
                this.indicatorGroups = indicatorGroups['indicatorGroups'];
              }
            });
          }
        }
      });
    }
  }

  getMetadataItemName(allItems, id) {
    _.map(allItems, (item: any) => {
      if (item.id == id) {
        return item.name;
      }
    });
  }

  sortLegends(legends) {
    return _.reverse(_.sortBy(legends, ['startValue']));
  }

  getCategories(categoryOptionCombos) {
    let categories = [];
    categoryOptionCombos.forEach(categoryCombo => {
      categoryCombo['categoryOptions'].forEach(option => {
        _.map(option['categories'], (category: any) => {
          categories.push(category);
        });
      });
    });
    return _.uniqBy(categories, 'id');
  }

  getDataSetFromDataElement(dataSetElements) {
    return dataSetElements;
  }

  getDataElementsGroups(dataElementGroups) {
    return dataElementGroups;
  }

  formatTextToSentenceFormat(text) {
    text
      .split('_')
      .map(function(stringSection) {
        return (
          stringSection.slice(0, 1).toUpperCase() +
          stringSection.slice(1).toLowerCase()
        );
      })
      .join(' ');
    return (
      text
        .split('_')
        .join(' ')
        .slice(0, 1)
        .toUpperCase() +
      text
        .split('_')
        .join(' ')
        .slice(1)
        .toLowerCase()
    );
  }

  exportMetadataInformation(dictionaryItem) {
    this.html = document.getElementById('template-to-export').outerHTML;
    const theDate = new Date();
    this.exportService.exportXLS(
      dictionaryItem.name + '_generated_on_' + theDate,
      this.html
    );
  }

  getOtherMetadata(allMedatada, listAllMetadataInGroup) {
    let newSlicedList = [];
    // _.map(allMedatada, (metadata) => {
    //   if (metadata.id !== this.selectedIndicator) {
    //     newSlicedList.push(metadata);
    //   }
    // })
    if (!listAllMetadataInGroup) {
      return allMedatada.slice(0, 3);
    } else {
      return allMedatada;
    }
  }

  getExpressionPart(element, indicator) {
    let expressionPartAvailability = [];
    if (indicator.numerator.indexOf(element.id) > -1) {
      expressionPartAvailability.push('Numerator');
    } else if (indicator.denominator.indexOf(element.id) > -1) {
      expressionPartAvailability.push('Denominator');
    }
    if (expressionPartAvailability.length == 1) {
      return expressionPartAvailability[0];
    } else if (expressionPartAvailability.length == 2) {
      return (
        expressionPartAvailability[0] + ' and ' + expressionPartAvailability[1]
      );
    } else {
      return 'None';
    }
  }

  getToCapitalLetters(color) {
    return _.upperCase(color);
  }

  getTodayDate() {
    const now = new Date();
    return now;
  }

  printPDF() {
    this.listAllMetadataInGroup = true;
    this.isPrintSet = true;
    if (this.isPrintSet) {
      setTimeout(function() {
        this.isprintSet = false;
        window.print();
      }, 500);
      setTimeout(function() {
        this.isprintSet = false;
      }, 1000);
    }
  }
}
