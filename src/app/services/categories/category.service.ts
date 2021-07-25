import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getAll() : Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.configService.get('apiUrl')}/categories`);
  }

  getAllByIds(ids: number[]) {
    const params = new HttpParams()
        .set('ids', ids.toString());
    return this.http.get<CategoryModel[]>(`${this.configService.get('apiUrl')}/categories`, { params });
  }

}
