import { HttpStatus } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NestMailerService } from 'src/mailer/mailer.service';
import { Test } from '@nestjs/testing';
describe('NestMailerService', () => {
  let mailerService: MailerService;
  let nestMailerService: NestMailerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        NestMailerService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    nestMailerService = moduleRef.get<NestMailerService>(NestMailerService);
    mailerService = moduleRef.get<MailerService>(MailerService);
  });

  describe('sendEmail', () => {
    it('debería enviar el correo exitosamente', async () => {
      const mailOptions = {
        to: 'destinatario@example.com',
        from: 'remite@example.com',
        subject: 'Correo de prueba',
        text: 'Este es un correo de prueba.',
      };

      jest.spyOn(mailerService, 'sendMail').mockResolvedValueOnce(undefined);

      const result = await nestMailerService.sendEmail(mailOptions);

      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.message).toBe('¡Correo enviado exitosamente!');
    });

    it('debería manejar un error de sobre de correo electrónico inválido', async () => {
      const mailOptions = {
        to: 'destinatario@example.com',
        from: 'dirección_de_correo_inválida',
        subject: 'Correo de prueba',
        text: 'Este es un correo de prueba.',
      };

      const result = await nestMailerService.sendEmail(mailOptions);

      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(result.message).toBe(
        'Sobre del correo electrónico inválido. Por favor, verifica las direcciones de correo electrónico.',
      );
    });
  });
});
