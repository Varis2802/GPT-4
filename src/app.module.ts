import { Module } from '@nestjs/common';
import { OpenaiService } from './openai/openai.service';
import { OpenaiController } from './openai/openai.controller';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OpenaiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
