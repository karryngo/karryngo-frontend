import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTravelColis2Component } from './post-travel-colis2.component';

describe('PostTravelColis2Component', () => {
  let component: PostTravelColis2Component;
  let fixture: ComponentFixture<PostTravelColis2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTravelColis2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTravelColis2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
