import { NgModule } from '@angular/core';

import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    MapRoutingModule, TranslateModule.forChild()
  ],
  declarations: [ MapComponent ]
})
export class MapModule { }
