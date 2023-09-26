import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreatePlantDto {
  id?: number; 

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  family: string;

  @IsNotEmpty()
  image: string;

  @IsInt()
  @Min(1)
  year: number;

  @IsNotEmpty()
  slug: string;
}

export class UpdatePlantDto {
  id?: number;
  _id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  family: string;

  @IsNotEmpty()
  image: string;

  @IsInt()
  @Min(1)
  year: number;

  @IsNotEmpty()
  slug: string;
}
