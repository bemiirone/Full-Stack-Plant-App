export class CreateUserDto {
  name: string;
  picture_url: string;
  email: string;
  password: string;
  admin?: boolean;
}

export class UpdateUserDto {
  name?: string;
  picture_url?: string;
  email?: string;
  password?: string;
  admin?: boolean;
}