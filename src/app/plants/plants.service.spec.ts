import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PlantsService } from './plants.service';
import { Plant } from './plant.interface';

describe('PlantsService', () => {
  let service: PlantsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlantsService],
    });

    service = TestBed.inject(PlantsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all plants from the API via GET', () => {
    const dummyPlants: Plant[] = [
      {
        id: 1,
        name: 'Test',
        family: 'Testaceae',
        year: 2020,
        slug: 'test',
        image: 'test.jpg',
      },
      {
        id: 2,
        name: 'Test 2',
        family: 'Testaceae 2',
        year: 2021,
        slug: 'test2',
        image: 'test2.jpg',
      },
    ];

    service.getPlants().subscribe((plants) => {
      expect(plants.length).toBe(2);
      expect(plants).toEqual(dummyPlants);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPlants);
  });

  it('should retrieve a single plant by id', () => {
    const dummyPlant: Plant = {
      id: 1,
      name: 'Test',
      family: 'Testaceae',
      year: 2020,
      slug: 'test',
      image: 'test.jpg',
    };

    service.getPlantById(1).subscribe((plant) => {
      expect(plant).toEqual(dummyPlant);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPlant);
  });

  it('should add a new plant via POST', () => {
    const newPlant: Plant = {
      id: 3,
      name: 'Test 3',
      family: 'Testaceae 3',
      year: 2022,
      slug: 'test3',
      image: 'test3.jpg',
    };

    service.addPlant(newPlant).subscribe((plant) => {
      expect(plant).toEqual(newPlant);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newPlant);
  });

  it('should update an existing plant via PUT', () => {
    const updatedPlant: Plant = {
      id: 1,
      name: 'Updated',
      family: 'Updatedaceae',
      year: 2020,
      slug: 'updated',
      image: 'updated.jpg',
    };

    service.updatePlant(updatedPlant).subscribe((plant) => {
      expect(plant).toEqual(updatedPlant);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${updatedPlant.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPlant);
  });

  it('should delete a plant by its id via DELETE', () => {
    const plantId = 1;

    service.deletePlant(plantId).subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/${plantId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
