import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlantDetailComponent } from './plant-detail.component';
import { Plant } from '../plant.interface';

describe('PlantDetailComponent', () => {
  let component: PlantDetailComponent;
  let fixture: ComponentFixture<PlantDetailComponent>;

  // Mock plant data
  const mockPlant: Plant = {
    _id: '650d5bbf9462f820628d6cda',
    id: 1,
    name: 'Evergreen oak',
    family: 'Quercus',
    image: 'https://example.com/image.jpg',
    year: 1785,
    slug: 'quercus-rotundifolia'
  };

  // Mock ActivatedRoute data
  const mockActivatedRoute = {
    snapshot: {
      data: {
        plant: mockPlant
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize plant$ based on route resolved data', (done) => {
    component.plant$.subscribe(plant => {
      expect(plant).toEqual(mockPlant);
      done();
    });
  });
});
