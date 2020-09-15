import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventLogModel } from 'src/app/models/eventlog.model';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {

  constructor(private http: HttpClient) { }

  getLatestByName(name: string): Observable<EventLogModel> {
    const params = new HttpParams()
        .set('name', name);
    return this.http.get<EventLogModel>(`${environment.apiUrl}/eventlogs`, { params });
  }

}
