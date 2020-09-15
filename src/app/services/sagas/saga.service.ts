import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SagaModel } from 'src/app/models/saga.model';
import { DataPage } from 'src/app/models/pagination/data.page';

@Injectable({
  providedIn: 'root'
})
export class SagaService {
  constructor(private http: HttpClient) { }
  
  getAll() : Observable<SagaModel[]> {
    return this.http.get<SagaModel[]>(`${environment.apiUrl}/saga`);
  }

  getById(id: number) : Observable<SagaModel> {
    return this.http.get<SagaModel>(`${environment.apiUrl}/saga/${id}`);
  }
  
  getPaginated(offset: number, limit: number) : Observable<DataPage<SagaModel>> {
    const params = new HttpParams()
        .set('offset', offset.toString())
        .set('limit', limit.toString());
    return this.http.get<DataPage<SagaModel>>(`${environment.apiUrl}/saga`, { params });
  }

  search(search: string): Observable<SagaModel[]> {
    return this.http.get<SagaModel[]>(`${environment.apiUrl}/saga?search=${search}`);
  }

}
