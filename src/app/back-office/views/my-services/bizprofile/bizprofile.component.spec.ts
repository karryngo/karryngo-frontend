import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizprofileComponent } from './bizprofile.component';

describe('BizprofileComponent', () => {
  let component: BizprofileComponent;
  let fixture: ComponentFixture<BizprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
