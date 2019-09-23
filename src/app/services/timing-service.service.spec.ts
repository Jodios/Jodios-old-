import { TestBed } from '@angular/core/testing';

import { TimingServiceService } from './timing-service.service';

describe('TimingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimingServiceService = TestBed.get(TimingServiceService);
    expect(service).toBeTruthy();
  });
});
