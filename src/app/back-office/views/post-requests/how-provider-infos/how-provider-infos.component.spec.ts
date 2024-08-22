import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowProviderInfosComponent } from './how-provider-infos.component';

describe('HowProviderInfosComponent', () => {
  let component: HowProviderInfosComponent;
  let fixture: ComponentFixture<HowProviderInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowProviderInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowProviderInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
