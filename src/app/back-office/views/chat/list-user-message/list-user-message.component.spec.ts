import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserMessageComponent } from './list-user-message.component';

describe('ListUserMessageComponent', () => {
  let component: ListUserMessageComponent;
  let fixture: ComponentFixture<ListUserMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
