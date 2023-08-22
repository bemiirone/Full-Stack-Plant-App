import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantFilterComponent } from './plant-filter.component';
import { FormsModule } from '@angular/forms';

describe('PlantFilterComponent', () => {
  let component: PlantFilterComponent;
  let fixture: ComponentFixture<PlantFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantFilterComponent],
      imports: [FormsModule],  // Needed for ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(PlantFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter value on filter change', () => {
    spyOn(component.filterChange, 'emit');

    const testFilterValue = 'test';
    component.filter = testFilterValue;
    component.onFilterChange();

    expect(component.filterChange.emit).toHaveBeenCalledWith(testFilterValue);
  });
});
