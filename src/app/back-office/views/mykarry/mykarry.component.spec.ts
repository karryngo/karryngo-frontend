import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MykarryComponent } from './mykarry.component';

describe('MykarryComponent', () => {
  let component: MykarryComponent;
  let fixture: ComponentFixture<MykarryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MykarryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MykarryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
