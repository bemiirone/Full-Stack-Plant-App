import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from '../user.interface';
import { Plant } from '../../plants/plant.interface';
import { ResolvedData } from 'src/app/resolved-data';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User | undefined>;
  plants$: Observable<Plant[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const resolvedData: ResolvedData = this.route.snapshot.data as ResolvedData;
    this.user$ = of(resolvedData.user);
    const userPlants = resolvedData.user?.plant_id
      ? resolvedData.plants.filter((plant) =>
          resolvedData.user!.plant_id.includes(plant.id)
        )
      : [];

    this.plants$ = of(userPlants);
  }
}
