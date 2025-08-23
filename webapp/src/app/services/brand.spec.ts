import { TestBed } from '@angular/core/testing';
import { BrandService } from './brandservice';

describe('BrandService', () => {
  let service: BrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandService);  // ✅ inject the service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
