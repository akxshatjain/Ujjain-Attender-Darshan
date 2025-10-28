import { TestBed } from '@angular/core/testing';

import { AttenderService } from './attender.service';

describe('AttenderService', () => {
  let service: AttenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
