import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  components: any[];
  ngOnInit() {
    this.components = [
      {
        id: 'http-client',
        name: 'Http Client'
      },
      { id: 'dictionary', name: 'Metadata Dictionary' },
      { id: 'org-unit-filter', name: 'Organisation Unit filter' },
      { id: 'org-unit-filter', name: 'Period filter' },
      { id: 'org-unit-filter', name: 'Data filter' },
      { id: 'org-unit-filter', name: 'Dimension filter' },
      { id: 'selection-filters', name: 'Selection Filters' }
    ];
  }
}
