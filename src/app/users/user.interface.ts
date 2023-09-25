export interface User {
  _id?: string;
  id: string;
  name: string;
  email: string;
  picture_url: string;
  password: string;
  admin: boolean;
  plant_id: number[];
}
