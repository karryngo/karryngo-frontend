import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUserMessageComponent } from './item-user-message.component';

describe('ItemUserMessageComponent', () => {
  let component: ItemUserMessageComponent;
  let fixture: ComponentFixture<ItemUserMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemUserMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUserMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
