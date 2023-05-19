import { Logger, HttpStatus } from '@nestjs/common';

export class EmailErrorHandler {
  private readonly logger = new Logger(EmailErrorHandler.name);

  handleError(error: any): any {
    this.logger.error(`Error sending email: ${error.message}`);
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'An unexpected error occurred while sending the email.';

    if (
      error.code === 'EENVELOPE' ||
      /invalid.*envelope/i.test(error.message)
    ) {
      statusCode = HttpStatus.BAD_REQUEST;
      errorMessage =
        'Invalid email envelope. Please verify the email addresses.';
    } else if (
      error.code === 'ECONNECTION' ||
      /could not establish.*connection/i.test(error.message)
    ) {
      statusCode = HttpStatus.SERVICE_UNAVAILABLE;
      errorMessage =
        'Could not establish a connection to the email server. Please try again later.';
    } else if (
      error.code === 'ECONNREFUSED' ||
      /connection refused/i.test(error.message)
    ) {
      statusCode = HttpStatus.SERVICE_UNAVAILABLE;
      errorMessage =
        'Connection refused by the email server. Please check the server status.';
    } else if (error.code === 'ETIMEDOUT' || /timed out/i.test(error.message)) {
      statusCode = HttpStatus.REQUEST_TIMEOUT;
      errorMessage =
        'Connection attempt to the email server timed out. Please try again later.';
    }

    return {
      statusCode,
      message: errorMessage,
      data: {
        errorCode: error.code,
        errorDescription: error.message,
      },
    };
  }
}
