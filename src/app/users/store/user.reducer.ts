import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../user.interface';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

const _userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error }))
  // Other actions can be handled similarly
);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
