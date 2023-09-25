import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { Plant } from 'src/app/plants/plant.interface';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {}, 
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user$ based on route resolved data', () => {
    const mockUser: User = {
      _id: '5f9d5f3b9d3f2b1b1c9b4b1b',
      name: 'Test User',
      email: 'ded@iii',
      picture_url: 'https://via.placeholder.com/150',
      password: '123456',
      admin: false,
      plant_id: [],
    };
    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.data = { user: mockUser, plants: [] };
  
    fixture.detectChanges();
  
    component.user$.subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
  });

  it('should set plants$ based on user plant_id and resolved plants data', () => {
    const mockUser: User = {
      _id: '5f9d5f3b9d3f2b1b1c9b4b1b',
      name: 'Test User',
      email: 'ded@iii',
      picture_url: 'https://via.placeholder.com/150',
      password: '123456',
      admin: false,
      plant_id: [1, 2],
    };
    const mockPlants: Plant[] = [
      {
        id: 1,
        name: 'Rose',
        family: 'Rosaceae',
        image: 'https://example.com/images/rose.jpg',
        year: 1753
      },
      {
        id: 2,
        name: 'Lily',
        family: 'Liliaceae',
        image: 'https://example.com/images/lily.jpg',
        year: 1758
      },
      {
        id: 3,
        name: 'Orchid',
        family: 'Orchidaceae',
        image: 'https://example.com/images/orchid.jpg',
        year: 1760
      }
    ];
    
    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.data = { user: mockUser, plants: mockPlants };
  
    fixture.detectChanges();
  
    component.plants$.subscribe((plants) => {
      expect(plants.length).toBe(2);
      expect(plants).toEqual(mockPlants.slice(0, 2));
    });
  });
  


});
