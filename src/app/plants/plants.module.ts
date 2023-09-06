import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantsListComponent } from './plants-list/plants-list.component';
import { RouterModule } from '@angular/router';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlantFormComponent } from './plant-form/plant-form.component';
import { PlantFilterComponent } from './plant-filter/plant-filter.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { plantReducer } from './store/plant.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlantEffects } from './store/plant.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('plants', plantReducer),
    EffectsModule.forFeature([PlantEffects]),
  ],
  declarations: [
    PlantsListComponent,
    PlantDetailComponent,
    PlantFormComponent,
    PlantFilterComponent,
  ],
})
export class PlantsModule {}
