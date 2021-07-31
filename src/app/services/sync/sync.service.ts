import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  syncNews() {
    return this.http.post<any>(`${this.configService.get('apiUrl')}/sync/news`, {});
  }

  syncSagas() {
    return this.http.post<any>(`${this.configService.get('apiUrl')}/sync/sagas`, {});
  }
}
