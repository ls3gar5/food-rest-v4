
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class DeviceTypeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    // const userAgent = request.headers['user-agent'];
    const userAgent = `Mozilla/5.0 (Linux; Android 10; STK-LX1 
        Build/HONORSTK-LX1; wv) AppleWebKit/537.36 (KHTML, 
        like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile 
        Safari/537.36 musical_ly_2022803040 JsSdk/1.0 
        NetType/WIFI Channel/huaweiadsglobal_int 
        AppName/musical_ly app_version/28.3.4 ByteLocale/en 
        ByteFullLocale/en Region/IQ Spark/1.2.7-alpha.8 
        AppVersion/28.3.4 PIA/1.5.11 BytedanceWebview/d8a21c6`;
    console.log('LEOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    console.log('User-Agent DAATAAAA:', userAgent);

    const parserInstance = new UAParser();
    parserInstance.setUA(userAgent);
    console.log('Parser InstanceAAAAAAAAA:', parserInstance.getResult());

    const parser = UAParser(userAgent);
    console.log('Parsed Device Info:', parser);
    const deviceType = parser.device.type || 'NO HAY NADAAA'; // defaults to desktop if null
    const osName = parser.os.name || 'NO LO SEEEEE'; 
    console.log('Parsed Device Info:', osName);
    // Attach device info to request for later use
    request.deviceType = deviceType;

    return next.handle();
  }
}
