import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RssMessageModel } from 'src/app/models/rss.message.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class RssMessageService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getByFeedTitle(feedTitle: string) : Observable<RssMessageModel[]> {
    return this.http.get<RssMessageModel[]>(`${this.configService.get('apiUrl')}/rss?feedTitle=${feedTitle}`);
  }

  getById(id: number) : Observable<RssMessageModel> {
    return this.http.get<RssMessageModel>(`${this.configService.get('apiUrl')}/rss/${id}`);
  }

}
