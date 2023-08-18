/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlantsService } from './plants.service';

describe('Service: Plants', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlantsService]
    });
  });

  it('should ...', inject([PlantsService], (service: PlantsService) => {
    expect(service).toBeTruthy();
  }));
});
