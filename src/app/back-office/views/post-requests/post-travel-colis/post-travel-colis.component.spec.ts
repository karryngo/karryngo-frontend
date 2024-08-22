import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTravelColisComponent } from './post-travel-colis.component';

describe('PostTravelColisComponent', () => {
  let component: PostTravelColisComponent;
  let fixture: ComponentFixture<PostTravelColisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTravelColisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTravelColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
