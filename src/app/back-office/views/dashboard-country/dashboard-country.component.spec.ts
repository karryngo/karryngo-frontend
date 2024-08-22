import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCountryComponent } from './dashboard-country.component';

describe('DashboardCountryComponent', () => {
  let component: DashboardCountryComponent;
  let fixture: ComponentFixture<DashboardCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
