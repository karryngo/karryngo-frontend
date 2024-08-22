import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCountryDetailsComponent } from './m-country-details.component';

describe('MCountryDetailsComponent', () => {
  let component: MCountryDetailsComponent;
  let fixture: ComponentFixture<MCountryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCountryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
