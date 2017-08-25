import { TestBed, inject } from '@angular/core/testing';

import { SemanticUiService } from './semantic-ui.service';

describe('SemanticUiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SemanticUiService]
    });
  });

  it('should be created', inject([SemanticUiService], (service: SemanticUiService) => {
    expect(service).toBeTruthy();
  }));
});
