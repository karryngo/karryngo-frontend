import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequest0Component } from './post-request0.component';

describe('PostRequest0Component', () => {
  let component: PostRequest0Component;
  let fixture: ComponentFixture<PostRequest0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequest0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequest0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
