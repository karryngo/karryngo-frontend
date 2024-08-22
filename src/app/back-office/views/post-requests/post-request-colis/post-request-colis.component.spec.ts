import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestColisComponent } from './post-request-colis.component';

describe('PostRequestColisComponent', () => {
  let component: PostRequestColisComponent;
  let fixture: ComponentFixture<PostRequestColisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestColisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
