import { Injectable } from '@angular/core';
import { HttpService } from './shared/http.service';
import { AppSettings } from './app-settings';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpService: HttpService) { }

  public loadConfig(): Promise<JSON> {
    const promise = this.httpService.get('assets/config.properties')
    .toPromise()
    .then(response => {
      AppSettings.API_ENDPOINT_URL = response.API_ENDPOINT_URL;
      AppSettings.GET_USERS_LIST_SERVICE = response.GET_USERS_LIST_SERVICE;
      AppSettings.GET_ALBUM_LIST_SERVICE = response.GET_ALBUM_LIST_SERVICE;
      AppSettings.GET_PHOTO_LIST_SERVICE = response.GET_PHOTO_LIST_SERVICE;
      return response;
    }).catch(error => {
      throw error;
    });
    return promise;
  }
}
