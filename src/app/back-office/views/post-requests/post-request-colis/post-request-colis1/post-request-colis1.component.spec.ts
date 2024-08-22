import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestColis1Component } from './post-request-colis1.component';

describe('PostRequestColis1Component', () => {
  let component: PostRequestColis1Component;
  let fixture: ComponentFixture<PostRequestColis1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestColis1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestColis1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
