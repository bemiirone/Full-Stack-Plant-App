import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantsListComponent } from './plants-list/plants-list.component';
import { RouterModule } from '@angular/router';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlantFormComponent } from './plant-form/plant-form.component';
import { PlantFilterComponent } from './plant-filter/plant-filter.component';
import { PlantPaginatorComponent } from './plant-paginator/plant-paginator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    PlantsListComponent,
    PlantDetailComponent,
    PlantFormComponent,
    PlantFilterComponent,
    PlantPaginatorComponent,
  ],
})
export class PlantsModule {}
