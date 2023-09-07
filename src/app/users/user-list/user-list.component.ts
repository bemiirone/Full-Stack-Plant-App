import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../user.interface';
import { loadUsers } from '../store/user.actions';
import { selectUsers } from '../store/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private store: Store<{ users: User[] }>) {}

  ngOnInit(): void {
    this.users$ = this.store.select(selectUsers);
    this.store.dispatch(loadUsers());
  }
}
