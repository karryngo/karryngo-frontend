import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyServiceDetailsComponent } from './my-service-details.component';

describe('MyServiceDetailsComponent', () => {
  let component: MyServiceDetailsComponent;
  let fixture: ComponentFixture<MyServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyServiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
