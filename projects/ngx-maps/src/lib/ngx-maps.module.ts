import { NgModule } from '@angular/core';
import { MapsComponent } from './components/maps/maps.component';
import { CommonModule } from '@angular/common';
import { MapModule } from './map/map.module';

@NgModule({
  declarations: [MapsComponent],
  imports: [CommonModule, MapModule],
  exports: [MapsComponent]
})
export class NgxMapsModule {}
