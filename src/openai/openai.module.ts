import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { ConfigModule } from './config.module';

@Module({
  imports: [ConfigModule],
  providers: [OpenaiService],
  controllers: [OpenaiController],
})
export class OpenaiModule {}
