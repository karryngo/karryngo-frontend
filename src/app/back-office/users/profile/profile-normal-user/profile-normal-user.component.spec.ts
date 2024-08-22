import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNormalUserComponent } from './profile-normal-user.component';

describe('ProfileNormalUserComponent', () => {
  let component: ProfileNormalUserComponent;
  let fixture: ComponentFixture<ProfileNormalUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNormalUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNormalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
