import { Injectable, InjectionToken } from '@angular/core';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export function ConfigFactory(configService: ConfigService, property: string) {
  return configService.getSetting(property);
}
          // returnValue = 'https://mylearningstrategywebapi.azurewebsites.net';
          //  returnValue = 'http://localhost:5000';
@Injectable()
export class ConfigService {

    getSetting(property: string) {
      let returnValue: any;
      switch (property) {
         case 'BASE_API_URL_KEY':
           returnValue = 'https://mylearningstrategywebapi.azurewebsites.net';
           break;
         default:
           returnValue = 'https://mylearningstrategywebapi.azurewebsites.net';
           break;
       }
      return returnValue;
    }

}
