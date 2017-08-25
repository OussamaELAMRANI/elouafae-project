import { TestBed, inject } from '@angular/core/testing';

import { AccordionUiService } from './accordion-ui.service';

describe('AccordionUiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccordionUiService]
    });
  });

  it('should be created', inject([AccordionUiService], (service: AccordionUiService) => {
    expect(service).toBeTruthy();
  }));
});
