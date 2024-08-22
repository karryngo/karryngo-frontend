import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestTransport3Component } from './post-request-transport3.component';

describe('PostRequestTransport3Component', () => {
  let component: PostRequestTransport3Component;
  let fixture: ComponentFixture<PostRequestTransport3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestTransport3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestTransport3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
