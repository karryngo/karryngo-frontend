import { ListServicesComponent } from './list-services/list-services.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// import { EventComponent } from './event/event.component';

@NgModule({
    declarations: [ListServicesComponent
    ],
    imports: [
        CommonModule, 
        NgxDatatableModule,
        TranslateModule.forChild(),
    ],
    exports: [ListServicesComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ComponentsModule{}