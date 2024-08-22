import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTvaComponent } from './m-tva.component';

describe('MTvaComponent', () => {
  let component: MTvaComponent;
  let fixture: ComponentFixture<MTvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
