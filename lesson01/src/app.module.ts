import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `${process.env.MONGO_URI}:${process.env.MONGO_PORT}`,
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(`DB is working on ${process.env.MONGO_PORT}`);
  }
}

//Module is for configuration
