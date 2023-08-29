import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantPaginatorComponent } from './plant-paginator.component';

describe('PlantPaginatorComponent', () => {
  let component: PlantPaginatorComponent;
  let fixture: ComponentFixture<PlantPaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantPaginatorComponent]
    });
    fixture = TestBed.createComponent(PlantPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
