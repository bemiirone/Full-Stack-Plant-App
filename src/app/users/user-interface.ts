export interface User {
  id: number;
  name: string;
  email: string;
  picture_url: string;
  password: string;
  admin: boolean;
  plant_id: number[];
}
