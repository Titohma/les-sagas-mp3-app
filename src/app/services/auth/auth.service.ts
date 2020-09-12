import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtResponseModel } from 'src/app/models/jwt.response.model';
import { JwtRequestModel } from 'src/app/models/jwt.request.model';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentTokenSubject: BehaviorSubject<JwtResponseModel>;
  private currentUserSubject: BehaviorSubject<UserModel>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<JwtResponseModel>(JSON.parse(localStorage.getItem('jwt')));
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('user')));
  }
  
  public get currentTokenValue(): JwtResponseModel {
    return this.currentTokenSubject.value;
  }

  public set currentTokenValue(jwtResponse: JwtResponseModel) {
    this.currentTokenSubject.next(jwtResponse);
  }

  public get currentUserValue(): UserModel {
    var user = this.currentUserSubject.value;
    if(user == null) {
      return new UserModel();
    }
    return this.currentUserSubject.value;
  }

  public set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  login(email: string, password: string) : Observable<JwtResponseModel> {
    var jwtRequest = new JwtRequestModel();
    jwtRequest.email = email;
    jwtRequest.password = password;
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, jwtRequest);
  }
  
  whoami() {
    if(this.currentTokenValue != null) {
      this.http.get<UserModel>(`${environment.apiUrl}/auth/whoami`)
        .subscribe(res => {
          localStorage.setItem('user', JSON.stringify(res));
          this.currentUserSubject.next(res);
        });
    }
  }

}
