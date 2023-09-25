import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { 
  loadPlants, loadPlantsSuccess, loadPlantsFailure,
  addPlant, addPlantSuccess, addPlantFailure,
  updatePlant, updatePlantSuccess, updatePlantFailure,
  deletePlant, deletePlantSuccess, deletePlantFailure, loadPlant, loadPlantSuccess
} from './plant.actions';
import { PlantsService } from '../plants.service';
import { Plant } from '../plant.interface';

@Injectable()
export class PlantEffects {
  
  private API_URL = 'http://localhost:3000/plants';
  constructor(private actions$: Actions, private plantsService: PlantsService) { }

  loadPlants$ = createEffect(() => this.actions$.pipe(
    ofType(loadPlants),
    mergeMap(action => this.plantsService.getPlants(action.limit, action.offset).pipe(
      map((plants: any) => loadPlantsSuccess({ plants })),
      catchError(error => of(loadPlantsFailure({ error })))
    ))
  ));

  loadSinglePlant$ = createEffect(() => this.actions$.pipe(
    ofType(loadPlant),
    mergeMap(action => this.plantsService.getPlantById(action.id).pipe(
      map((plant: Plant) => loadPlantSuccess({ plant })),
      catchError(error => of(loadPlantsFailure({ error })))
    ))
  ));

  addPlant$ = createEffect(() => this.actions$.pipe(
    ofType(addPlant),
    mergeMap(action => this.plantsService.addPlant(action.plant).pipe(
      map((plant: any) => addPlantSuccess({ plant })),
      catchError(error => of(addPlantFailure({ error })))
    ))
  ));

  updatePlant$ = createEffect(() => this.actions$.pipe(
    ofType(updatePlant),
    mergeMap(action => this.plantsService.updatePlant(action.plant).pipe(
      map((plant: any) => updatePlantSuccess({ plant })),
      catchError(error => of(updatePlantFailure({ error })))
    ))
  ));

  deletePlant$ = createEffect(() => this.actions$.pipe(
    ofType(deletePlant),
    mergeMap(action => this.plantsService.deletePlant(action.id).pipe(
      map(() => deletePlantSuccess({ id: action.id })),
      catchError(error => of(deletePlantFailure({ error })))
    ))
  ));
}
