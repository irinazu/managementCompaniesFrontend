import { TestBed } from '@angular/core/testing';

import { UserSystemService } from './user-system.service';

describe('UserSystemService', () => {
  let service: UserSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
