import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullIntroComponent } from './full-intro.component';

describe('FullIntroComponent', () => {
  let component: FullIntroComponent;
  let fixture: ComponentFixture<FullIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
