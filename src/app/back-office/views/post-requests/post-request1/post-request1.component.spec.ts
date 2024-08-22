import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequest1Component } from './post-request1.component';

describe('PostRequest1Component', () => {
  let component: PostRequest1Component;
  let fixture: ComponentFixture<PostRequest1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequest1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
