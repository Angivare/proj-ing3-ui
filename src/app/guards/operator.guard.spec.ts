import { TestBed, async, inject } from '@angular/core/testing';

import { OperatorGuard } from './operator.guard';

describe('OperatorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperatorGuard]
    });
  });

  it('should ...', inject([OperatorGuard], (guard: OperatorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
