import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import {
  Observable,
  catchError,
  filter,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { User } from './user.interface';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import { selectUserById } from './store/user.selectors';
import { Injectable } from '@angular/core';
import { loadUser } from './store/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserResolverService implements Resolve<User> {
  constructor(private store: Store, private userService: UserService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    const userId = +route.params['id'];

    return this.store.select(selectUserById, { id: userId }).pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return of(user);
        } else {
          this.store.dispatch(loadUser({ id: userId }));
          return this.userService.getUserById(userId).pipe(
            catchError((err) => {
              console.error('Error fetching user:', err);
              return throwError(err);
            })
          );
        }
      })
    );
  }
}
