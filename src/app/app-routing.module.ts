import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantsListComponent } from './plants/plants-list/plants-list.component';
import { PlantDetailComponent } from './plants/plant-detail/plant-detail.component';
import { PlantFormComponent } from './plants/plant-form/plant-form.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { PlantsResolverService } from './plants/plants-resolver.service';
import { UserResolverService } from './users/user.resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/plants', pathMatch: 'full' },
  { path: 'plants', component: PlantsListComponent },
  { path: 'plants/new', component: PlantFormComponent },
  { path: 'plants/:id', component: PlantDetailComponent },
  { path: 'plants/:id/edit', component: PlantFormComponent },
  { path: 'users', component: UserListComponent },
  { 
    path: 'users/:id', 
    component: UserDetailComponent, 
    resolve: { 
      plants: PlantsResolverService, 
      user: UserResolverService 
    } 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

