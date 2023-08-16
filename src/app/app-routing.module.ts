import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantsListComponent } from './plants/plants-list/plants-list.component';
import { PlantDetailComponent } from './plants/plant-detail/plant-detail.component';
import { PlantFormComponent } from './plants/plant-form/plant-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/plants', pathMatch: 'full' },
  { path: 'plants', component: PlantsListComponent },
  { path: 'plants/new', component: PlantFormComponent },
  { path: 'plants/:id', component: PlantDetailComponent },
  { path: 'plants/:id/edit', component: PlantFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

