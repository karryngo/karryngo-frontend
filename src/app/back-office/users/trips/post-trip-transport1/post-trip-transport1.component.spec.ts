import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTripTransport1Component } from './post-trip-transport1.component';

describe('PostTripTransport1Component', () => {
  let component: PostTripTransport1Component;
  let fixture: ComponentFixture<PostTripTransport1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTripTransport1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTripTransport1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
