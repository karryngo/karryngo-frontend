import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestColis0Component } from './post-request-colis0.component';

describe('PostRequestColisComponent0', () => {
  let component: PostRequestColis0Component;
  let fixture: ComponentFixture<PostRequestColis0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestColis0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestColis0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
