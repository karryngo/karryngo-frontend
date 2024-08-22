import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTripCarrierShipmentComponent } from './view-trip-carrier-shipment.component';

describe('ViewTripCarrierShipmentComponent', () => {
  let component: ViewTripCarrierShipmentComponent;
  let fixture: ComponentFixture<ViewTripCarrierShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTripCarrierShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTripCarrierShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
