import { TestBed, async, inject } from '@angular/core/testing';

import { PortalGuard } from './portal.guard';

describe('PortalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortalGuard]
    });
  });

  it('should ...', inject([PortalGuard], (guard: PortalGuard) => {
    expect(guard).toBeTruthy();
  }));
});
