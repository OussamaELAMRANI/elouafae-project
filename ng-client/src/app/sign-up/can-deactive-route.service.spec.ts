import { TestBed, inject } from '@angular/core/testing';

import { CanDeactiveRouteService } from './can-deactive-route.service';

describe('CanDeactiveRouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactiveRouteService]
    });
  });

  it('should be created', inject([CanDeactiveRouteService], (service: CanDeactiveRouteService) => {
    expect(service).toBeTruthy();
  }));
});
