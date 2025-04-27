import { TestBed } from '@angular/core/testing';

import { PinchGestureService } from './pinch-gesture.service';

describe('PinchGestureService', () => {
  let service: PinchGestureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinchGestureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
