import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitAcceptanceComponent } from './wait-acceptance.component';

describe('WaitAcceptanceComponent', () => {
  let component: WaitAcceptanceComponent;
  let fixture: ComponentFixture<WaitAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
