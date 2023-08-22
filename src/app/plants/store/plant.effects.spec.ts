import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { PlantsService } from '../plants.service';
import { 
  loadPlants, loadPlantsSuccess, loadPlantsFailure,
  addPlant, addPlantSuccess, addPlantFailure,
  updatePlant, updatePlantSuccess, updatePlantFailure,
  deletePlant, deletePlantSuccess, deletePlantFailure
} from './plant.actions';
import { PlantEffects } from './plant.effects';

describe('PlantEffects', () => {
  let actions$: Observable<any>;
  let effects: PlantEffects;
  let plantsService: jasmine.SpyObj<PlantsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PlantsService', ['getPlants', 'addPlant', 'updatePlant', 'deletePlant']);

    TestBed.configureTestingModule({
      providers: [
        PlantEffects,
        provideMockActions(() => actions$),
        { provide: PlantsService, useValue: spy }
      ]
    });

    effects = TestBed.inject(PlantEffects);
    plantsService = TestBed.inject(PlantsService) as jasmine.SpyObj<PlantsService>;
  });

  it('should dispatch loadPlantsSuccess on successful load', () => {
    const mockPlants = [{ id: 1, name: 'Test', family: 'Testaceae', year: 2020, slug: 'test', image: 'test.jpg' }];
    plantsService.getPlants.and.returnValue(of(mockPlants));

    actions$ = of(loadPlants());

    effects.loadPlants$.subscribe(action => {
      expect(action).toEqual(loadPlantsSuccess({ plants: mockPlants }));
    });
  });

  it('should dispatch loadPlantsFailure on error', () => {
    plantsService.getPlants.and.returnValue(throwError('error'));

    actions$ = of(loadPlants());

    effects.loadPlants$.subscribe(action => {
      expect(action).toEqual(loadPlantsFailure({ error: 'error' }));
    });
  });

  describe('loadPlants$', () => {
    it('should dispatch loadPlantsSuccess on successful load', () => {
      const mockPlants = [{ id: 1, name: 'Test', family: 'Testaceae', year: 2020, slug: 'test', image: 'test.jpg' }];
      plantsService.getPlants.and.returnValue(of(mockPlants));

      actions$ = of(loadPlants());

      effects.loadPlants$.subscribe(action => {
        expect(action).toEqual(loadPlantsSuccess({ plants: mockPlants }));
      });
    });

    it('should dispatch loadPlantsFailure on error', () => {
      plantsService.getPlants.and.returnValue(throwError('error'));

      actions$ = of(loadPlants());

      effects.loadPlants$.subscribe(action => {
        expect(action).toEqual(loadPlantsFailure({ error: 'error' }));
      });
    });
  });

  describe('addPlant$', () => {
    it('should dispatch addPlantSuccess on successful addition', () => {
      const mockPlant = { id: 1, name: 'Test', family: 'Testaceae', year: 2020, slug: 'test', image: 'test.jpg' };
      plantsService.addPlant.and.returnValue(of(mockPlant));

      actions$ = of(addPlant({ plant: mockPlant }));

      effects.addPlant$.subscribe(action => {
        expect(action).toEqual(addPlantSuccess({ plant: mockPlant }));
      });
    });

    it('should dispatch addPlantFailure on error', () => {
      const mockPlant = { id: 1, name: 'Test', family: 'Testaceae', year: 2020, slug: 'test', image: 'test.jpg' };
      plantsService.addPlant.and.returnValue(throwError('error'));

      actions$ = of(addPlant({ plant: mockPlant }));

      effects.addPlant$.subscribe(action => {
        expect(action).toEqual(addPlantFailure({ error: 'error' }));
      });
    });
  });

  describe('updatePlant$', () => {
    it('should dispatch updatePlantSuccess on successful update', () => {
      const mockPlant = { id: 1, name: 'Updated Test', family: 'Testaceae', year: 2020, slug: 'test', image: 'test.jpg' };
      plantsService.updatePlant.and.returnValue(of(mockPlant));

      actions$ = of(updatePlant({ plant: mockPlant }));

      effects.updatePlant$.subscribe(action => {
        expect(action).toEqual(updatePlantSuccess({ plant: mockPlant }));
      });
    });

    it('should dispatch updatePlantFailure on error', () => {
      const mockPlant = { id: 1, name: 'Updated Test', family: 'Testaceae', year: 2020, slug: 'test', image: 'test.jpg' };
      plantsService.updatePlant.and.returnValue(throwError('error'));

      actions$ = of(updatePlant({ plant: mockPlant }));

      effects.updatePlant$.subscribe(action => {
        expect(action).toEqual(updatePlantFailure({ error: 'error' }));
      });
    });
  });

  describe('deletePlant$', () => {
    it('should dispatch deletePlantSuccess on successful delete', () => {
      const mockId = 1;
      plantsService.deletePlant.and.returnValue(of(undefined));

      actions$ = of(deletePlant({ id: mockId }));

      effects.deletePlant$.subscribe(action => {
        expect(action).toEqual(deletePlantSuccess({ id: mockId }));
      });
    });

    it('should dispatch deletePlantFailure on error', () => {
      const mockId = 1;
      plantsService.deletePlant.and.returnValue(throwError('error'));

      actions$ = of(deletePlant({ id: mockId }));

      effects.deletePlant$.subscribe(action => {
        expect(action).toEqual(deletePlantFailure({ error: 'error' }));
      });
    });
  });



});

