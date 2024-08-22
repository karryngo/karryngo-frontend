import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTravelColis1Component } from './post-travel-colis1.component';

describe('PostTravelColis1Component', () => {
  let component: PostTravelColis1Component;
  let fixture: ComponentFixture<PostTravelColis1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTravelColis1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTravelColis1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
