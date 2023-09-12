import { of } from 'rxjs';
import { Plant } from './plant.interface';
import { PlantsResolverService } from './plants-resolver.service';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { PlantsService } from './plants.service';
import { loadPlantsSuccess } from './store/plant.actions';

const mockPlants: Plant[] = [
  {
    id: 1,
    name: 'Plant A',
    family: 'Family A',
    image: 'image-url',
    year: 2020
  },
  {
    id: 2,
    name: 'Plant B',
    family: 'Family B',
    image: 'image-url',
    year: 2021
  },
  {
    id: 3,
    name: 'Plant C',
    family: 'Family C',
    image: 'image-url',
    year: 2022
  },
];

const mockPlantsService = {
  getPlants: jasmine.createSpy('getPlants').and.returnValue(of(mockPlants))
};

const mockStore = {
  select: jasmine.createSpy('select').and.returnValue(of(mockPlants)),
  dispatch: jasmine.createSpy('dispatch')
};

describe('PlantsResolverService', () => {
  let resolver: PlantsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlantsResolverService,
        { provide: PlantsService, useValue: mockPlantsService },
        { provide: Store, useValue: mockStore },
      ],
    });

    resolver = TestBed.inject(PlantsResolverService);
  });

  it('should resolve plant data', (done) => {
    resolver.resolve({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe((plants) => {
      expect(plants).toEqual(mockPlants);
      done(); 
    });
  });

  it('should dispatch plants to store if not present in state', (done) => {
    mockStore.select.and.returnValue(of([])); 

    resolver.resolve({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe(() => {
      expect(mockStore.dispatch).toHaveBeenCalledWith(loadPlantsSuccess({ plants: mockPlants }));
      done(); 
    });
  });

  it('should not dispatch plants to store if already present in state', (done) => {
    mockStore.select.and.returnValue(of(mockPlants)); 

    resolver.resolve({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe(() => {
      expect(mockStore.dispatch).not.toHaveBeenCalledWith(loadPlantsSuccess);
      done(); 
    });
  });

});
