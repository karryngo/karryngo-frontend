import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestTrip1Component } from './post-request-trip1.component';

describe('PostRequestTrip1Component', () => {
  let component: PostRequestTrip1Component;
  let fixture: ComponentFixture<PostRequestTrip1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestTrip1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestTrip1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
