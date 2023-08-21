import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantFilterComponent } from './plant-filter.component';

describe('PlantFilterComponent', () => {
  let component: PlantFilterComponent;
  let fixture: ComponentFixture<PlantFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantFilterComponent]
    });
    fixture = TestBed.createComponent(PlantFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
