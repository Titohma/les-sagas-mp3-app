import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private http: HttpClient) { }

  syncNews() {
    return this.http.post<any>(`${environment.apiUrl}/sync/news`, {});
  }

  syncSagas() {
    return this.http.post<any>(`${environment.apiUrl}/sync/sagas`, {});
  }
}
