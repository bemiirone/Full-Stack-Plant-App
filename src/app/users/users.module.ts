import { User } from './user.interface';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [UserListComponent, UserDetailComponent]
})
export class UsersModule { }
