import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { SelectionDialogComponent } from '../../components/selection-dialog/selection-dialog.component';
import { SelectionFilterConfig } from '../../models/selected-filter-config.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-selection-filters',
  templateUrl: './ngx-dhis2-selection-filters.component.html',
  styleUrls: ['./ngx-dhis2-selection-filters.component.css'],
})
export class NgxDhis2SelectionFiltersComponent implements OnInit {
  @Input() dataSelections: any[];
  @Input() layout: any;
  @Input() selectionFilterConfig: SelectionFilterConfig;

  @Output() selectionFilterUpdate: EventEmitter<any[]> = new EventEmitter<
    any[]
  >();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // initialize data Selections
    if (!this.dataSelections || !_.isArray(this.dataSelections)) {
      this.dataSelections = [];
    }
  }

  onOpenFilter(e) {
    e.stopPropagation();
    const selectionDialog = this.dialog.open(SelectionDialogComponent, {
      width: '50%',
      data: {
        dataSelections: this.dataSelections,
        layout: this.layout,
        selectionFilterConfig: this.selectionFilterConfig,
      },
    });

    selectionDialog.afterClosed().subscribe((dataSelections: any[]) => {
      this.selectionFilterUpdate.emit(dataSelections);
    });
  }
}
