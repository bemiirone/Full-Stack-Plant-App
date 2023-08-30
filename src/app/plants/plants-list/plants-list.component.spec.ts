import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantsListComponent } from './plants-list.component';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Plant } from '../plant.interface';
import { deletePlant, loadPlants, updatePlant } from '../store/plant.actions';
import { PlantFilterComponent } from '../plant-filter/plant-filter.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlantPaginatorComponent } from '../plant-paginator/plant-paginator.component';
import { PaginatorComponent } from 'src/app/shared/paginator/paginator.component';

describe('PlantsListComponent', () => {
  let component: PlantsListComponent;
  let fixture: ComponentFixture<PlantsListComponent>;
  let store: Store;
  let dialog: MatDialog;

  function configureTestingModule(dialogMockValue = {}) {
    const storeMock = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select').and.returnValue(of([])),
    };

    const defaultDialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(null),
      }),
    };

    const activatedRouteMock = {
      queryParams: of({ limit: 10, offset: 0 })
    };

    const dialogMock = { ...defaultDialogMock, ...dialogMockValue };

    return TestBed.configureTestingModule({
      declarations: [PlantsListComponent, PlantFilterComponent, PaginatorComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
      imports: [FormsModule],
    }).compileComponents();
  }

  beforeEach(async () => {
    await configureTestingModule();
    fixture = TestBed.createComponent(PlantsListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPlants on init',  () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadPlants({ limit: 10, offset: 0 }));
  });

  it('should open dialog on addPlant', () => {
    component.addPlant();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open dialog and dispatch updatePlant on editPlant', () => {
    const mockPlant: Plant = {
      id: 1,
      name: 'Test Plant',
      family: 'Testaceae',
      year: 2020,
      slug: 'test-plant',
      image: 'test.jpg',
    };

    (dialog.open as jasmine.Spy).and.returnValue({
      afterClosed: () => of(mockPlant),
    });

    component.editPlant(mockPlant);
    expect(dialog.open).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      updatePlant({ plant: mockPlant })
    );
  });

  it('should open confirmation dialog, confirm, and dispatch deletePlant', async () => {
    TestBed.resetTestingModule();
    await configureTestingModule({
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true),
      }),
    });

    fixture = TestBed.createComponent(PlantsListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();

    component.deletePlant(1);
    expect(dialog.open).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(deletePlant({ id: 1 }));
  });

  it('should open confirmation dialog, cancel, and not dispatch deletePlant', async () => {
    TestBed.resetTestingModule();
    await configureTestingModule({
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(false),
      }),
    });

    fixture = TestBed.createComponent(PlantsListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();

    component.deletePlant(1);
    expect(dialog.open).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalledWith(deletePlant({ id: 1 }));
  });
});
