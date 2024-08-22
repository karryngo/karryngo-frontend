import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MServiceStatisticsComponent } from './m-service-statistics.component';

describe('MServiceStatisticsComponent', () => {
  let component: MServiceStatisticsComponent;
  let fixture: ComponentFixture<MServiceStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MServiceStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MServiceStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
