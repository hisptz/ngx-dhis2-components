import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DragulaModule } from 'ng2-dragula';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxPaginationModule } from 'ngx-pagination';

import { DataFilterGroupMemberComponent } from './components/data-filter-group-member/data-filter-group-member.component';
import { DataFilterGroupsComponent } from './components/data-filter-groups/data-filter-groups.component';
import { DataGroupItemComponent } from './components/data-group-item/data-group-item.component';
import { DataFilterComponent } from './containers/data-filter/data-filter.component';
import { AddUnderscorePipe } from './pipes/add-underscore.pipe';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { OrderPipe } from './pipes/order-by.pipe';
import { ReadableNamePipe } from './pipes/readable-name.pipe';
import { RemoveSelectedItemsPipe } from './pipes/remove-selected-items.pipe';
import { DataElementGroupEffects } from './store/effects/data-element-group.effects';
import { DataElementEffects } from './store/effects/data-element.effects';
import { DataFilterEffects } from './store/effects/data-filter.effects';
import { FunctionRuleEffects } from './store/effects/function-rule.effects';
import { FunctionEffects } from './store/effects/function.effects';
import { IndicatorGroupEffects } from './store/effects/indicator-group.effects';
import { IndicatorEffects } from './store/effects/indicator.effects';
import { dataFilterReducer } from './store/reducers/data-filter.reducer';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    DragulaModule,
    ColorPickerModule,
    NgxPaginationModule,
    NgxDhis2HttpClientModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    StoreModule.forFeature('dataFilter', dataFilterReducer),
    MatIconModule,
    EffectsModule.forFeature([
      DataFilterEffects,
      FunctionEffects,
      FunctionRuleEffects,
      IndicatorEffects,
      IndicatorGroupEffects,
      DataElementGroupEffects,
      DataElementEffects
    ])
  ],
  declarations: [
    DataFilterGroupMemberComponent,
    DataFilterGroupsComponent,
    DataGroupItemComponent,
    DataFilterComponent,
    AddUnderscorePipe,
    OrderPipe,
    ReadableNamePipe,
    RemoveSelectedItemsPipe,
    FilterByNamePipe,
    ReadableNamePipe
  ],
  exports: [DataFilterComponent]
})
export class NgxDhis2DataFilterModule {}
