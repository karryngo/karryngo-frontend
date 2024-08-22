import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardedServicesComponent } from './awarded-services.component';

describe('AwardedServicesComponent', () => {
  let component: AwardedServicesComponent;
  let fixture: ComponentFixture<AwardedServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardedServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
