import { TestBed } from '@angular/core/testing';

import { LocalpersistenceService } from './localpersistence.service';

describe('LocalpersistenceService', () => {
  let service: LocalpersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalpersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
