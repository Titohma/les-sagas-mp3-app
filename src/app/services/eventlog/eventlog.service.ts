import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventLogModel } from 'src/app/models/eventlog.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getLatestByName(name: string): Observable<EventLogModel> {
    const params = new HttpParams()
        .set('name', name);
    return this.http.get<EventLogModel>(`${this.configService.get('apiUrl')}/eventlogs`, { params });
  }

}
