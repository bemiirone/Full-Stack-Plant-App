// plants.dto.ts

import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreatePlantDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  family: string;

  @IsInt()
  @Min(1)
  year: number;

  @IsNotEmpty()
  slug: string;
}

export class UpdatePlantDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  family: string;

  @IsInt()
  @Min(1)
  year: number;

  @IsNotEmpty()
  slug: string;
}
