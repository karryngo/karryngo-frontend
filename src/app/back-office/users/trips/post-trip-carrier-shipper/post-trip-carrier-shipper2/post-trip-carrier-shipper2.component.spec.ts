import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTripCarrierShipper2Component } from './post-trip-carrier-shipper2.component';

describe('PostTripCarrierShipper2Component', () => {
  let component: PostTripCarrierShipper2Component;
  let fixture: ComponentFixture<PostTripCarrierShipper2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTripCarrierShipper2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTripCarrierShipper2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
