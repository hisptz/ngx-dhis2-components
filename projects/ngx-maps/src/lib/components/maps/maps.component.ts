import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'ngx-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @Input() visualizationObject: any;
  constructor() {}

  ngOnInit(): void {
    console.log('visualizationObject', this.visualizationObject);
  }
}
