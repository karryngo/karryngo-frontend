import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingZoneComponent } from './typing-zone.component';

describe('TypingZoneComponent', () => {
  let component: TypingZoneComponent;
  let fixture: ComponentFixture<TypingZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypingZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
