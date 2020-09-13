import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthorModel } from 'src/app/models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAllByIds(ids: number[]) {
    const params = new HttpParams()
        .set('ids', ids.toString());
    return this.http.get<AuthorModel[]>(`${environment.apiUrl}/authors`, { params });
  }

}
