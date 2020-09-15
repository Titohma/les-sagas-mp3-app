import { TestBed } from '@angular/core/testing';

import { EventLogService } from './eventlog.service';

describe('EventLogService', () => {
  let service: EventLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
