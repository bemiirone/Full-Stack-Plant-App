// plants-resolver.service.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { selectPlants } from './store/plant.selectors';
import { Plant } from './plant.interface';
import { PlantsService } from './plants.service';
import { loadPlantsSuccess } from './store/plant.actions';

@Injectable({
  providedIn: 'root',
})
export class PlantsResolverService implements Resolve<Plant[]> {
  constructor(private store: Store, private plantsService: PlantsService) {
    console.log('PlantsResolverService created');
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plant[]> {
    return this.store.select(selectPlants).pipe(
        take(1),
        switchMap(plants => {
            if (plants && plants.length > 0) {
                return of(plants);
            }
            return this.plantsService.getPlants().pipe(
                tap(fetchedPlants => {
                    this.store.dispatch(loadPlantsSuccess({ plants: fetchedPlants }));
                })
            );
        }),
        catchError(err => {
            console.error('Error fetching plants:', err);
            return of([]);
        })
    );
}

}
