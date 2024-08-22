import { TestBed } from '@angular/core/testing';

import { GeneraleService } from './generale.service';

describe('GeneraleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneraleService = TestBed.get(GeneraleService);
    expect(service).toBeTruthy();
  });
});
