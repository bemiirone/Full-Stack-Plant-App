import { of, throwError } from 'rxjs';
import { Plant } from './plant.interface';
import { PlantResolverService } from './plant.resolver.service';
import { loadPlant } from './store/plant.actions';

xdescribe('PlantResolverService', () => {
  let resolver: PlantResolverService;
  let mockStore: any;
  let mockPlantsService: any;

  const dummyPlant: Plant = {
    id: 1,
    name: 'Plant A',
    family: 'Family A',
    image: 'image-url',
    year: 2020
  };

  beforeEach(() => {
    mockStore = jasmine.createSpyObj(['select', 'dispatch']);
    mockPlantsService = jasmine.createSpyObj(['getPlantById']);
    resolver = new PlantResolverService(mockStore, mockPlantsService);
  });

  it('should retrieve plant from store if it exists', (done) => {
    mockStore.select.and.returnValue(of(dummyPlant));

    resolver.resolve({ params: { id: '1' } } as any, {} as any).subscribe(plant => {
      expect(plant).toEqual(dummyPlant);
      done();
    });
  });

  it('should dispatch loadPlant action if plant does not exist in store', () => {
    mockStore.select.and.returnValue(of(null));

    resolver.resolve({ params: { id: '1' } } as any, {} as any).subscribe();

    expect(mockStore.dispatch).toHaveBeenCalledWith(loadPlant({ id: 1 }));
  });

  it('should fetch plant from API if not in store and API call is successful', (done) => {
    mockStore.select.and.returnValue(of(null));
    mockPlantsService.getPlantById.and.returnValue(of(dummyPlant));

    resolver.resolve({ params: { id: '1' } } as any, {} as any).subscribe(plant => {
      expect(plant).toEqual(dummyPlant);
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