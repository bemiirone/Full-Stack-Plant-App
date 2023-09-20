import { Module } from '@nestjs/common';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Plant, PlantSchema } from './schema/plant.schema';

@Module({
  controllers: [PlantsController],
  providers: [PlantsService],
  imports: [MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }])],
})
export class PlantsModule {}
