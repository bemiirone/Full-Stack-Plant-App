// plants.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { CreatePlantDto, UpdatePlantDto } from './dto/plants.dto';
import { PlantsService } from './plants.service';

@Controller()
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get('/plants')
  findAll() {
    return this.plantsService.findAll();
  }

  @Get('/plants/:id')
  findOne(@Param('id') id: string) {
    return this.plantsService.findOne(id);
  }

  @Post('/plants')
  create(@Body() createPlantDto: CreatePlantDto) {
    return this.plantsService.create(createPlantDto);
  }

  @Put('/plants/:id')
  update(@Param('id') id: string, @Body() updatePlantDto: UpdatePlantDto) {
    return this.plantsService.update(id, updatePlantDto);
  }

  @Delete('/plants/:id')
  remove(@Param('id') id: string) {
    return this.plantsService.remove(id);
  }
}
