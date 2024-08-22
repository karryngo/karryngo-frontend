import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmTransportComponentComponent } from './comfirm-transport-component.component';

describe('ComfirmTransportComponentComponent', () => {
  let component: ComfirmTransportComponentComponent;
  let fixture: ComponentFixture<ComfirmTransportComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComfirmTransportComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfirmTransportComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
