import { HttpException, HttpStatus } from '@nestjs/common';

export class BadGatewayException extends HttpException {
  constructor(cause?: { message: string; cause: any }) {
    super('Bad Gateway', HttpStatus.BAD_GATEWAY, cause);
  }
}
