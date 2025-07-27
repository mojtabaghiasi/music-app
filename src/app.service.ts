import { Inject, Injectable } from '@nestjs/common';
import { EnvConfig } from './common/constants/config';

@Injectable()
export class AppService {
  constructor(@Inject("CONFIG") config: EnvConfig){
    console.log(config);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
