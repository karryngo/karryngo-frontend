import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestColis2Component } from './post-request-colis2.component';

describe('PostRequestColis2Component', () => {
  let component: PostRequestColis2Component;
  let fixture: ComponentFixture<PostRequestColis2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestColis2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestColis2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
