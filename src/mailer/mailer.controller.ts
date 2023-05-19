import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiResponse } from '../models/response.model';
import { NestMailerService } from './mailer.service';

@Controller('email')
export class EmailController {
  constructor(private readonly nestMailerService: NestMailerService) {}

  @Post()
  async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<ApiResponse> {
    const { to, subject, text } = sendEmailDto;
    const response = await this.nestMailerService.sendEmail({
      to,
      subject,
      text,
    });
    return response;
  }
}
