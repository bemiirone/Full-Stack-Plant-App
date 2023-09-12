import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { UserListComponent } from './user-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { loadUsers } from '../store/user.actions';
import { selectUsers } from '../store/user.selectors';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: MockStore;

  const initialState = { users: [] }; // Add your initial state here if required

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.callThrough();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select users from the store', () => {
    component.users$.subscribe();
    expect(store.select).toHaveBeenCalledWith(selectUsers);
  });

  it('should dispatch loadUsers action on initialization', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadUsers());
  });
});
