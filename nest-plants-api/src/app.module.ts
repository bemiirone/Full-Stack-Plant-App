import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { PlantsModule } from './plants/plants.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  imports: [
    PlantsModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://bemidev:XS9cbvJ0ozvy6NTd@cluster0.rj4uwoq.mongodb.net/plantsDB?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
