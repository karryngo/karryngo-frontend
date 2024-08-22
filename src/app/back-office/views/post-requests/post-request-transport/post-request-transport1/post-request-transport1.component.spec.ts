import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestTransport1Component } from './post-request-transport1.component';

describe('PostRequestTransport1Component', () => {
  let component: PostRequestTransport1Component;
  let fixture: ComponentFixture<PostRequestTransport1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestTransport1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestTransport1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
