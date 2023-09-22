// plants.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { CreatePlantDto, UpdatePlantDto } from './dto/plants.dto';
import { PlantsService } from './plants.service';

@Controller()
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get('/plants')
  findAll(
    @Query('limit') limitQuery: string,
    @Query('offset') offsetQuery: string
  ) {
    const limit = limitQuery ? parseInt(limitQuery) : undefined;
    const offset = parseInt(offsetQuery) || 0;
    return this.plantsService.findAll(limit, offset);
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
