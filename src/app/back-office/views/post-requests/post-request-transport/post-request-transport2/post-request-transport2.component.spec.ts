import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestTransport2Component } from './post-request-transport2.component';

describe('PostRequestTransport2Component', () => {
  let component: PostRequestTransport2Component;
  let fixture: ComponentFixture<PostRequestTransport2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestTransport2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestTransport2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
