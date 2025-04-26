import { TestBed } from '@angular/core/testing';

import { SwipeGestureService } from './swipe-gesture.service';

describe('SwipeGestureService', () => {
  let service: SwipeGestureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwipeGestureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
