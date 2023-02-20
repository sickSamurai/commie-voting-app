import { TestBed } from '@angular/core/testing';

import { VotingCreationFormService } from './voting-creation-form.service';

describe('VotingCreationFormService', () => {
  let service: VotingCreationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotingCreationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
