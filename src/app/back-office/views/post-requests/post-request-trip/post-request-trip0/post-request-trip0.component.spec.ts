import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestTrip0Component } from './post-request-trip0.component';

describe('PostRequestTripComponent0', () => {
  let component: PostRequestTrip0Component;
  let fixture: ComponentFixture<PostRequestTrip0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestTrip0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestTrip0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
