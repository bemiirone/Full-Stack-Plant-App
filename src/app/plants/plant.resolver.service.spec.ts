import { of, throwError } from 'rxjs';
import { Plant } from './plant.interface';
import { PlantResolverService } from './plant.resolver.service';
import { loadPlant } from './store/plant.actions';
import { TestBed } from '@angular/core/testing';
import { PlantsService } from './plants.service';
import { Store } from '@ngrx/store';

describe('PlantResolverService', () => {
  let resolver: PlantResolverService;
  const mockPlant: Plant = {
    id: 1,
    _id: '1',
    name: 'Plant A',
    family: 'Family A',
    image: 'image-url',
    year: 2020
  };
  const mockStore = {
    select: jasmine.createSpy('select').and.returnValue(of(mockPlant)),
    dispatch: jasmine.createSpy('dispatch'),
  };

  const mockPlantsService = {
    getPlantById: jasmine.createSpy('getPlantById').and.returnValue(of(mockPlant))
  };



  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlantResolverService,
        { provide: PlantsService, useValue: mockPlantsService },
        { provide: Store, useValue: mockStore },
      ],
    });

    resolver = TestBed.inject(PlantResolverService);
  });

  it('should retrieve plant from store if it exists', (done) => {
    mockStore.select.and.returnValue(of(mockPlant));

    resolver.resolve({ params: { id: '1' } } as any, {} as any).subscribe(plant => {
      expect(plant).toEqual(mockPlant);
      done();
    });
  });

  it('should dispatch loadPlant action if plant does not exist in store', () => {
    mockStore.select.and.returnValue(of(null));

    resolver.resolve({ params: { id: '1' } } as any, {} as any).subscribe();

    expect(mockStore.dispatch).toHaveBeenCalledWith(loadPlant({ _id: '1' }));
  });

  it('should fetch plant from API if not in store and API call is successful', (done) => {
    mockStore.select.and.returnValue(of(null));
    mockPlantsService.getPlantById.and.returnValue(of(mockPlant));

    resolver.resolve({ params: { id: '1' } } as any, {} as any).subscribe(plant => {
      expect(plant).toEqual(mockPlant);
      done();
    });
  });

  it('should handle error if plant not in store and API call fails', (done) => {
    mockStore.select.and.returnValue(of(null));
    mockPlantsService.getPlantById.and.returnValue(throwError('API error'));

    resolver.resolve({ params: { id: '1' } } as any, {} as any).subscribe(
      () => {},
      error => {
        expect(error).toBe('API error');
        done();
      }
    );
  });
});
