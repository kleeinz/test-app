import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  public info(message: string) {
    console.log(message);
  }

  public debug(message: string) {
    console.debug(message);
  }

  public warn(message: string) {
    console.warn(message);
  }

  public trace(message: string) {
    console.trace(message);
  }

  public error(message: string) {
    console.error(message);
  }

}
