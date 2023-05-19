import { Module } from '@nestjs/common';
import { NestMailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NestMailerModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
