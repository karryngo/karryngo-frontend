import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindServicesComponent } from './find-services.component';

describe('FindServicesComponent', () => {
  let component: FindServicesComponent;
  let fixture: ComponentFixture<FindServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
