import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRequestTripsComponent } from './post-request-trips.component';

describe('PostRequestTripsComponent', () => {
  let component: PostRequestTripsComponent;
  let fixture: ComponentFixture<PostRequestTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRequestTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRequestTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
