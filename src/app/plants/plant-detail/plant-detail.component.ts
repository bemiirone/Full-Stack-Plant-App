import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, } from 'rxjs';
import { Plant } from '../plant.interface';
import { ResolvedData } from 'src/app/resolved-data';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {

  plant$: Observable<Plant>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: ResolvedData = this.route.snapshot.data as ResolvedData;
    this.plant$ = of(resolvedData.plant);
  }
}
