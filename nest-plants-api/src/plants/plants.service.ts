// plants.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePlantDto, UpdatePlantDto } from './dto/plants.dto';
import { Plant } from './schema/plant.schema';

@Injectable()
export class PlantsService {
  constructor(@InjectModel(Plant.name) private plantModel: Model<Plant>) {}

  async findAll(limit?: number, offset?: number): Promise<Plant[]> {
    let query = this.plantModel.find();
    if (limit !== undefined) {
        query = query.limit(limit);
    }
    if (offset !== undefined) {
        query = query.skip(offset);
    }
    return query.exec();
}

  async findOne(id: string): Promise<Plant> {
    const objectId = new Types.ObjectId(id);
    return this.plantModel.findById(objectId).exec();
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
