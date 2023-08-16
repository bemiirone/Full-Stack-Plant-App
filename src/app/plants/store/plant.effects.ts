import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { 
  loadPlants, loadPlantsSuccess, loadPlantsFailure,
  addPlant, addPlantSuccess, addPlantFailure,
  updatePlant, updatePlantSuccess, updatePlantFailure,
  deletePlant, deletePlantSuccess, deletePlantFailure
} from './plant.actions';

@Injectable()
export class PlantEffects {
  
  private API_URL = 'http://localhost:3000/plants';

  headerOptions = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  };

  loadPlants$ = createEffect(() => this.actions$.pipe(
    ofType(loadPlants),
    mergeMap(() => this.http.get(`${this.API_URL}`, this.headerOptions).pipe(
      map((plants: any) => loadPlantsSuccess({ plants })),
      catchError(error => of(loadPlantsFailure({ error })))
    ))
  ));

  addPlant$ = createEffect(() => this.actions$.pipe(
    ofType(addPlant),
    mergeMap(action => this.http.post(`${this.API_URL}`, action.plant).pipe(
      map((plant: any) => addPlantSuccess({ plant })),
      catchError(error => of(addPlantFailure({ error })))
    ))
  ));

  updatePlant$ = createEffect(() => this.actions$.pipe(
    ofType(updatePlant),
    mergeMap(action => this.http.put(`${this.API_URL}/${action.plant.id}`, action.plant).pipe(
      map((plant: any) => updatePlantSuccess({ plant })),
      catchError(error => of(updatePlantFailure({ error })))
    ))
  ));

  deletePlant$ = createEffect(() => this.actions$.pipe(
    ofType(deletePlant),
    mergeMap(action => this.http.delete(`${this.API_URL}/${action.id}`).pipe(
      map(() => deletePlantSuccess({ id: action.id })),
      catchError(error => of(deletePlantFailure({ error })))
    ))
  ));

  constructor(private actions$: Actions, private http: HttpClient) { }
}
