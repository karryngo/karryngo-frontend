import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestTrip2Component } from './post-request-trip2.component';

describe('PostRequestTrip2Component', () => {
  let component: PostRequestTrip2Component;
  let fixture: ComponentFixture<PostRequestTrip2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestTrip2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestTrip2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
