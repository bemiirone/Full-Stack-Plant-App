import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantsListComponent } from './plants-list/plants-list.component';
import { RouterModule } from '@angular/router';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [PlantsListComponent, PlantDetailComponent]
})
export class PlantsModule { }
