import { TestBed } from '@angular/core/testing';

import { ProviderCompanyService } from './provider-company.service';

describe('ProviderCompanyService', () => {
  let service: ProviderCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
