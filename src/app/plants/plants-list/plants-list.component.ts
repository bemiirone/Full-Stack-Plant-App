import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Plant } from '../plant.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantFormComponent } from '../plant-form/plant-form.component';
import {
  addPlant,
  deletePlant,
  loadPlants,
  updatePlant,
} from '../store/plant.actions';
import { selectPlants } from '../store/plant.selectors';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.css'],
})
export class PlantsListComponent implements OnInit {
  plants$: Observable<Plant[]>;
  filter = '';
  currentPage = 1;
  plantsPerPage = 8;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['limit']) {
        this.plantsPerPage = +params['limit'];
      }
      if (params['offset']) {
        this.currentPage = +params['offset'] / this.plantsPerPage + 1;
      }
      this.loadPlantsForPage(this.currentPage);
    });
  }

  addPlant(): void {
    const dialogRef = this.dialog.open(PlantFormComponent, {
      width: '400px',
      data: { plant: null },
    });

    dialogRef.afterClosed().subscribe((result: Plant) => {
      if (result) {
        this.store.dispatch(addPlant({ plant: result }));
      }
    });
  }

  editPlant(plant: Plant): void {
    const dialogRef = this.dialog.open(PlantFormComponent, {
      width: '400px',
      data: { plant: { ...plant } },
    });

    dialogRef.afterClosed().subscribe((result: Plant) => {
      if (result) {
        this.store.dispatch(updatePlant({ plant: result }));
      }
    });
  }

  deletePlant(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete this plant?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deletePlant({ id }));
      }
    });
  }

  applyFilter(filter: string): void {
    this.filter = filter.toLowerCase();
    this.plants$ = this.store
      .select(selectPlants)
      .pipe(
        map((plants) =>
          plants.filter(
            (plant) =>
              plant.name.toLowerCase().includes(this.filter) ||
              plant.family.toLowerCase().includes(this.filter) ||
              plant.year.toString().includes(this.filter)
          )
        )
      );
  }

  loadPlantsForPage(page: number): void {
    const offset = (page - 1) * this.plantsPerPage;
    const limit = this.plantsPerPage;

    this.store.dispatch(loadPlants({ limit, offset }));
    this.plants$ = this.store.select(selectPlants);
  }

navigatePage(direction: 'next' | 'prev'): void {
  let newOffset: number;

  if (direction === 'next') {
      newOffset = this.currentPage * this.plantsPerPage;
  } else {
      newOffset = (this.currentPage - 2) * this.plantsPerPage;
  }

  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { limit: this.plantsPerPage, offset: newOffset },
    queryParamsHandling: 'merge',
  });
}


}
