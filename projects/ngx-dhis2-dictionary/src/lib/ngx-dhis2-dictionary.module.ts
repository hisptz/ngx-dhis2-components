import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';

import { components } from './components';
import { containers } from './containers';
import { pipes } from './pipes';
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
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

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

  declarations: [...components, ...containers, ...pipes],
  exports: [...containers],
  providers: [DatePipe, IndicatorsService, ExportService]
})
export class NgxDhis2DictionaryModule {}
