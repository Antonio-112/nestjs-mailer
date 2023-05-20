import { Test } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { NestMailerService } from '../../../src/mailer/mailer.service';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { HttpStatus, HttpException } from '@nestjs/common';

describe('NestMailerService', () => {
  let service: NestMailerService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        NestMailerService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<NestMailerService>(NestMailerService);
    mailerService = moduleRef.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send email and return success message', async () => {
      const sendMailOptions: ISendMailOptions = {
        to: 'test@example.com',
        from: 'noreply@example.com',
        subject: 'Test Email',
        text: 'This is a test email',
      };

      const response = await service.sendEmail(sendMailOptions);

      expect(mailerService.sendMail).toBeCalledWith(sendMailOptions);
      expect(response).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Email successfully sent!',
      });
    });

    it('should throw error if email address is invalid', async () => {
      const sendMailOptions: ISendMailOptions = {
        to: 'invalidEmail',
        from: 'noreply@example.com',
        subject: 'Test Email',
        text: 'This is a test email',
      };

      await expect(service.sendEmail(sendMailOptions)).rejects.toThrow(
        HttpException,
      );
    });

    it('should handle failure of email sending operation', async () => {
      const sendMailOptions: ISendMailOptions = {
        to: 'test@example.com',
        from: 'noreply@example.com',
        subject: 'Test Email',
        text: 'This is a test email',
      };

      jest
        .spyOn(mailerService, 'sendMail')
        .mockRejectedValue(new Error('Failed to send email'));

      await expect(service.sendEmail(sendMailOptions)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
