import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestRent0Component } from './post-request-rent0.component';

describe('PostRequestTripComponent0', () => {
  let component: PostRequestRent0Component;
  let fixture: ComponentFixture<PostRequestRent0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestRent0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestRent0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
