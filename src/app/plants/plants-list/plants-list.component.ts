import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Plant } from '../plant.interface';
import { MatDialog } from '@angular/material/dialog';
import { PlantFormComponent } from '../plant-form/plant-form.component';
import {
  addPlant,
  deletePlant,
  loadPlants,
  updatePlant,
} from '../store/plant.actions';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.css'],
})
export class PlantsListComponent implements OnInit {
  plants$: Observable<Plant[]>;

  constructor(private store: Store<{ plants: Plant[] }>) {
    this.plants$ = store.select('plants');
  }

  ngOnInit(): void {
    this.store.dispatch(loadPlants());
  }
}
