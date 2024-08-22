import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationEnterCodeComponent } from './activation-enter-code.component';

describe('ActivationEnterCodeComponent', () => {
  let component: ActivationEnterCodeComponent;
  let fixture: ComponentFixture<ActivationEnterCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationEnterCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationEnterCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
