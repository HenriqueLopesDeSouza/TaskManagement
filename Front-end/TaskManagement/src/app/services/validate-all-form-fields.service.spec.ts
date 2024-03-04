import { TestBed } from '@angular/core/testing';

import { ValidateAllFormFieldsService } from './validate-all-form-fields.service';

describe('ValidateAllFormFieldsService', () => {
  let service: ValidateAllFormFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateAllFormFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
