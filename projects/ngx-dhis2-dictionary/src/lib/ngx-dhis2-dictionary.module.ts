import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';

import { DataElementGroupComponent } from './components/data-element-group/data-element-group.component';
import { DataElementComponent } from './components/data-element/data-element.component';
import { DataSetComponent } from './components/data-set/data-set.component';
import { DictionaryMenuComponent } from './components/dictionary-menu/dictionary-menu.component';
import { DictionaryProgressComponent } from './components/dictionary-progress/dictionary-progress.component';
import { FunctionsComponent } from './components/functions/functions.component';
import { IndicatorPropertiesComponent } from './components/indicator-properties/indicator-properties.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { IndicatorsListComponent } from './components/indicators-list/indicators-list.component';
import { MetadataListComponent } from './components/metadata-list/metadata-list.component';
import { ProgramIndicatorPropertiesComponent } from './components/program-indicator-properties/program-indicator-properties.component';
import { ProgramIndicatorComponent } from './components/program-indicator/program-indicator.component';
import { ProgramIndicatorsComponent } from './components/program-indicators/program-indicators.component';
import { SwitchingBtnsComponent } from './components/switching-btns/switching-btns.component';
import { DictionaryListComponent } from './containers/dictionary-list/dictionary-list.component';
import { FilterBySearchInputPipe } from './pipes/filter-by-search-input.pipe';
import { FilterIndicatorsByGroupIdPipe } from './pipes/filter-indicators-by-group-id.pipe';
import { SearchIndicatorGroupPipe } from './pipes/search-indicator-group.pipe';
import { ShortenNamePipe } from './pipes/shorten-name.pipe';
import { ExportService } from './services/export.service';
import { IndicatorsService } from './services/indicators.service';
import { DictionaryEffects } from './store/effects/dictionary.effects';
import { IndicatorsEffects } from './store/effects/indicators.effects';
import { dictionaryReducer } from './store/reducers/dictionary.reducer';
import {
  allIndicatorsRedcuer,
  indicatorGroupsReducer,
  indicatorsListReducer,
  programIndicatorGroupsReducer,
  programIndicatorsListReducer
} from './store/reducers/indicators.reducers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    StoreModule.forFeature('dictionary', dictionaryReducer),
    StoreModule.forFeature('indicatorsList', indicatorsListReducer),
    StoreModule.forFeature(
      'programIndicatorsList',
      programIndicatorsListReducer
    ),
    StoreModule.forFeature('allIndicators', allIndicatorsRedcuer),
    StoreModule.forFeature('indicatorGroups', indicatorGroupsReducer),
    StoreModule.forFeature(
      'programIndicatorGroups',
      programIndicatorGroupsReducer
    ),
    EffectsModule.forFeature([DictionaryEffects]),
    EffectsModule.forFeature([IndicatorsEffects])
  ],

  declarations: [
    DataElementComponent,
    DataElementGroupComponent,
    DataSetComponent,
    DictionaryProgressComponent,
    FunctionsComponent,
    MetadataListComponent,
    ProgramIndicatorComponent,
    IndicatorsListComponent,
    IndicatorPropertiesComponent,
    ProgramIndicatorPropertiesComponent,
    ProgramIndicatorComponent,
    ProgramIndicatorsComponent,
    SwitchingBtnsComponent,
    DictionaryMenuComponent,
    IndicatorComponent,
    DictionaryListComponent,
    SearchIndicatorGroupPipe,
    FilterBySearchInputPipe,
    FilterIndicatorsByGroupIdPipe,
    ShortenNamePipe
  ],
  exports: [DictionaryListComponent],
  providers: [DatePipe, IndicatorsService, ExportService]
})
export class NgxDhis2DictionaryModule {}
