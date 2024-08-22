import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCarrierComponent } from './profile-carrier.component';

describe('ProfileCarrierComponent', () => {
  let component: ProfileCarrierComponent;
  let fixture: ComponentFixture<ProfileCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
