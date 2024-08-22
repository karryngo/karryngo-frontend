import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTripCarrierShipper1Component } from './post-trip-carrier-shipper1.component';

describe('PostTripCarrierShipper1Component', () => {
  let component: PostTripCarrierShipper1Component;
  let fixture: ComponentFixture<PostTripCarrierShipper1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTripCarrierShipper1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTripCarrierShipper1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
