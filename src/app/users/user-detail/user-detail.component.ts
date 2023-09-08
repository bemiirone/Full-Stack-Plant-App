import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap, tap } from 'rxjs';
import { User } from '../user.interface';
import { selectUserById } from '../store/user.selectors'; 
import { Plant } from '../../plants/plant.interface';
import { selectPlantsByIds } from '../../plants/store/plant.selectors'; // Assuming you have this selector
import { loadPlants } from 'src/app/plants/store/plant.actions';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User | undefined>;
  plants$: Observable<Plant[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadPlants({}));
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.user$ = this.store.select(selectUserById, { id });
    this.plants$ = this.user$.pipe(
      map(user => user?.plant_id || []),
      switchMap(plantIds => this.store.select(selectPlantsByIds, { ids: plantIds || [] })),
    );
  }
}

