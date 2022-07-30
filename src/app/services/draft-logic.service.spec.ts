import { TestBed } from '@angular/core/testing';

import { DraftLogicService } from './draft-logic.service';

describe('DraftLogicService', () => {
  let service: DraftLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
