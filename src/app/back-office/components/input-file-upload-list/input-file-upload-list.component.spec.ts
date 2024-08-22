import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileUploadListComponent } from './input-file-upload-list.component';

describe('InputFileUploadListComponent', () => {
  let component: InputFileUploadListComponent;
  let fixture: ComponentFixture<InputFileUploadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFileUploadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileUploadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
