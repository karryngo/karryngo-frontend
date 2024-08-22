import { TestBed } from '@angular/core/testing';

import { TempsreelService } from './tempsreel.service';

describe('TempsreelService', () => {
  let service: TempsreelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempsreelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
