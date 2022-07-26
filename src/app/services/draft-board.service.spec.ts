import { TestBed } from '@angular/core/testing';

import { DraftBoardService } from './draft-board.service';

describe('DraftBoardService', () => {
  let service: DraftBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
