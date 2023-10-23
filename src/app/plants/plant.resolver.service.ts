import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { take, switchMap, catchError, tap, filter } from 'rxjs/operators';
import { Plant } from './plant.interface'; 
import { PlantsService } from './plants.service'; 
import { loadPlant } from './store/plant.actions'; 
import { selectPlantById } from './store/plant.selectors'; 

@Injectable({
  providedIn: 'root',
})
export class PlantResolverService implements Resolve<Plant> {
  constructor(
    private store: Store,
    private plantsService: PlantsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plant> {
    const _id = route.params['id'];
  
    return this.store.select(selectPlantById, { _id }).pipe(
      tap(plant => {
        if (!plant) {
          this.store.dispatch(loadPlant({ _id }));
        }
      }),
      switchMap(plant => {
        if (plant) {
          return of(plant);
        }
        return this.plantsService.getPlantById(_id).pipe(
          catchError(err => {
            console.error('Error fetching plant:', err);
            return throwError(err);
          })
        );
      }),
      take(1)
    );
  }
  
}
