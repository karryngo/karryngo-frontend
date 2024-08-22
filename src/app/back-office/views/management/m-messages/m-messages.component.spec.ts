import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MMessagesComponent } from './m-messages.component';

describe('MMessagesComponent', () => {
  let component: MMessagesComponent;
  let fixture: ComponentFixture<MMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
