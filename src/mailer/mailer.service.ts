import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { ApiResponse } from '../models/response.model';
import { EmailErrorHandler } from '../errors/email.error-handler';

@Injectable()
export class NestMailerService {
  private readonly logger = new Logger(NestMailerService.name);
  private readonly errorHandler: EmailErrorHandler;

  constructor(private readonly mailerService: MailerService) {
    this.errorHandler = new EmailErrorHandler();
  }

  async sendEmail(mailOptions: ISendMailOptions): Promise<ApiResponse> {
    try {
      await this.mailerService.sendMail(mailOptions);
      this.logger.log(`Email sent to ${mailOptions.to}`);
      return {
        statusCode: HttpStatus.OK,
        message: 'Email successfully sent!',
      };
    } catch (error) {
      return this.errorHandler.handleError(error);
    }
  }
}
