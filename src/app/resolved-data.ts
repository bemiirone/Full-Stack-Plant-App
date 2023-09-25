import { Plant } from './plants/plant.interface';
import { User } from './users/user.interface';

export interface ResolvedData {
  user: User;
  plant: Plant;
  plants: Plant[];
}

