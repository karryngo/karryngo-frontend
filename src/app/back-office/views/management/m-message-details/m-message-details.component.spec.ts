import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MMessageDetailsComponent } from './m-message-details.component';

describe('MMessageDetailsComponent', () => {
  let component: MMessageDetailsComponent;
  let fixture: ComponentFixture<MMessageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MMessageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
