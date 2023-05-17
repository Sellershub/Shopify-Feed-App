import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
// import { HelperService } from './modules/helper/helper.service';

export interface ExceptionResponse {
  status: number;
  message: string;
  timestamp: string;
  path: string;
}
export type ResponseError = string | ExceptionResponse | object;

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  // constructor(private helperService: HelperService) {}

  catch(e: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    console.log(e);

    if (!(e instanceof HttpException)) {
      // throw new InternalServerErrorException();
      Logger.error('Internal server error');

      return;
    }

    const status = e.getStatus();
    const errorResponse: ResponseError = e.getResponse();
    const message: string = errorResponse.hasOwnProperty('message')
      ? (errorResponse as ExceptionResponse).message
      : (errorResponse as string);

    Logger.error(message);
    // this.helperService.writeErrorLog(message);

    const response: ExceptionResponse = {
      status,
      message,
      timestamp: new Date().toISOString(),
      path: req.url,
    };

    res.status(status).json(response);
  }
}
