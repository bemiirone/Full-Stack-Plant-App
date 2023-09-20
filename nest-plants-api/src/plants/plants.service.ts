// plants.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlantDto, UpdatePlantDto } from './dto/plants.dto';
import { Plant } from './schema/plant.schema';

@Injectable()
export class PlantsService {
  constructor(@InjectModel(Plant.name) private plantModel: Model<Plant>) {}

  async findAll(): Promise<Plant[]> {
    return this.plantModel.find().exec();
  }

  async findOne(id: string): Promise<Plant> {
    return this.plantModel.findById(id).exec();
  }

  async create(createPlantDto: CreatePlantDto): Promise<Plant> {
    const createdPlant = new this.plantModel(createPlantDto);
    return createdPlant.save();
  }

  async update(id: string, updatePlantDto: UpdatePlantDto): Promise<Plant> {
    return this.plantModel.findByIdAndUpdate(id, updatePlantDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    await this.plantModel.findByIdAndRemove(id).exec();
  }
}
