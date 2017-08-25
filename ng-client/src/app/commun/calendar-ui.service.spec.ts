import { TestBed, inject } from '@angular/core/testing';

import { CalendarUiService } from './calendar-ui.service';

describe('CalendarUiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarUiService]
    });
  });

  it('should be created', inject([CalendarUiService], (service: CalendarUiService) => {
    expect(service).toBeTruthy();
  }));
});
