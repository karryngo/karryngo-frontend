import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTravelColis0Component } from './post-travel-colis0.component';

describe('PostRequestColisComponent0', () => {
  let component: PostTravelColis0Component;
  let fixture: ComponentFixture<PostTravelColis0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTravelColis0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTravelColis0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
