import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCarrierBusinessComponent } from './profile-carrier-business.component';

describe('ProfileCarrierBusinessComponent', () => {
  let component: ProfileCarrierBusinessComponent;
  let fixture: ComponentFixture<ProfileCarrierBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCarrierBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCarrierBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
