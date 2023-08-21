import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Plant } from '../plant.interface';
import { MatDialog } from '@angular/material/dialog';
import { PlantFormComponent } from '../plant-form/plant-form.component';
import {
  addPlant,
  deletePlant,
  loadPlants,
  updatePlant,
} from '../store/plant.actions';
import { selectPlants } from '../store/plant.selectors';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.css'],
})
export class PlantsListComponent implements OnInit {
  plants$: Observable<Plant[]>;
  filter = '';

  constructor(private store: Store<{ plants: Plant[] }>, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadPlants());
    this.plants$ = this.store.select(selectPlants);
  }

  addPlant(): void {
    const dialogRef = this.dialog.open(PlantFormComponent, {
      width: '400px',
      data: { plant: null }
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
      data: { plant: { ...plant } }
    });

    dialogRef.afterClosed().subscribe((result: Plant) => {
      if (result) {
        this.store.dispatch(updatePlant({ plant: result }));
      }
    });
  }

  deletePlant(id: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this plant?');
    if (confirmDelete) {
      this.store.dispatch(deletePlant({ id }));
    }
  }

  applyFilter(filter: string): void {
    this.filter = filter.toLowerCase();
    this.plants$ = this.store.select(selectPlants).pipe(
      map(plants => plants.filter(plant =>
        plant.name.toLowerCase().includes(this.filter) ||
        plant.family.toLowerCase().includes(this.filter) ||
        plant.year.toString().includes(this.filter)
      ))
    );
  }

}
