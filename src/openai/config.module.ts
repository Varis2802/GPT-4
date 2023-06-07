import { ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common';
// ConfigModule.ts
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}