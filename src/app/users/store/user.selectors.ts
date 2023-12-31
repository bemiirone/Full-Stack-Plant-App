import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { User } from '../user.interface';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUserById = createSelector(
  selectUsers,
  (users: User[], props: { id: string }) => users.find(user => user._id === props.id)
);


