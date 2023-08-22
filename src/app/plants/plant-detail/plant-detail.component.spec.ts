import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PlantDetailComponent } from './plant-detail.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Plant } from '../plant.interface';

describe('PlantDetailComponent', () => {
  let component: PlantDetailComponent;
  let fixture: ComponentFixture<PlantDetailComponent>;
  let store: Store;
  const mockPlant: Plant = {
    id: 1,
    name: 'Test Plant',
    family: 'Testaceae',
    year: 2020,
    slug: 'test-plant',
    image: 'test.jpg',
  };

  const storeMock = {
    select: jasmine.createSpy('select').and.returnValue(of(mockPlant)),
  };

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get').and.returnValue('1'), // return '1' for the 'id' parameter
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantDetailComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the id from the route and select the plant from the store', () => {
    expect(activatedRouteMock.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(store.select).toHaveBeenCalled();
  });
});
