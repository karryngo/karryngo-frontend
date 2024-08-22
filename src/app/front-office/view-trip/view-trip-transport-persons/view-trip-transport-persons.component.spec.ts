import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTripTransportPersonsComponent } from './view-trip-transport-persons.component';

describe('ViewTripTransportPersonsComponent', () => {
  let component: ViewTripTransportPersonsComponent;
  let fixture: ComponentFixture<ViewTripTransportPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTripTransportPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTripTransportPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
