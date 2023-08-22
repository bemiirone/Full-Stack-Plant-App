import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { Plant } from '../plant.interface';
import { selectPlant } from '../store/plant.selectors';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {

  plant$: Observable<Plant>;

  constructor(private route: ActivatedRoute, private store: Store<{ plants: Plant[] }>) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.plant$ = this.store.select(selectPlant, { id }).pipe(
      filter((plant: Plant | undefined): plant is Plant => !!plant)
    );
  }
}
