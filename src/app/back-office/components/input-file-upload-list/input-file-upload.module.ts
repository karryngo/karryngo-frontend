import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFileUploadComponent } from './input-file-upload/input-file-upload.component';
import { MatIconModule, MatSelectModule, MatChipsModule } from '@angular/material';
import { InputFileUploadListComponent } from './input-file-upload-list.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    InputFileUploadComponent,
    InputFileUploadListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    TranslateModule,
    MatSelectModule,
    MatChipsModule
  ],
  exports: [
    InputFileUploadComponent,
    InputFileUploadListComponent
  ]
})
export class InputFileUploadModule { }
