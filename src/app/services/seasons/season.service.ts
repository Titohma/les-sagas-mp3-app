import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeasonModel } from 'src/app/models/season.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private http: HttpClient, private configService: ConfigService) { }
  
  getAllByIds(ids: number[]) {
    const params = new HttpParams()
        .set('ids', ids.toString());
    return this.http.get<SeasonModel[]>(`${this.configService.get('apiUrl')}/season`, { params });
  }

}
