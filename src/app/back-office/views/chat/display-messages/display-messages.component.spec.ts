import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMessagesComponent } from './display-messages.component';

describe('DisplayMessagesComponent', () => {
  let component: DisplayMessagesComponent;
  let fixture: ComponentFixture<DisplayMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
