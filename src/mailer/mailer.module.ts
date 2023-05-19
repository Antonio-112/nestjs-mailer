import { Module, Logger } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestMailerService } from './mailer.service';
import { EmailController } from './mailer.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      // Importa el módulo de Mailer de NestJS de forma asíncrona
      imports: [ConfigModule], // Importa el módulo de Config de NestJS
      useFactory: async (configService: ConfigService) => ({
        // Define una fábrica que devuelve la configuración de MailerModule
        transport: {
          host: configService.get<string>('MAILER_HOST'), // Obtiene la variable de entorno MAILER_HOST
          port: configService.get<number>('MAILER_PORT'), // Obtiene la variable de entorno MAILER_PORT
          secure: configService.get<string>('MAILER_SECURE') === 'true', // Obtiene y convierte a boolean la variable de entorno MAILER_SECURE
          auth: {
            user: configService.get<string>('MAILER_USER'), // Obtiene la variable de entorno MAILER_USER
            pass: configService.get<string>('MAILER_PASSWORD'), // Obtiene la variable de entorno MAILER_PASSWORD
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>', // Define el correo por defecto del remitente
        },
      }),
      inject: [ConfigService], // Inyecta ConfigService en la fábrica
    }),
  ],
  controllers: [EmailController],
  providers: [NestMailerService, Logger],
  exports: [NestMailerService],
})
export class NestMailerModule {}
