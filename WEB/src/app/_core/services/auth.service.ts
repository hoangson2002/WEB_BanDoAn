import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserSessionModel } from '../models/user-session-model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refreshTokenTimeout: any;
  private currentUserSubject: BehaviorSubject<UserSessionModel>;

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {
    this.currentUserSubject = new BehaviorSubject<UserSessionModel>(
      JSON.parse(localStorage.getItem('currentUser') || '{"flag":false}')
    );
  }

  public get userValue(): UserSessionModel {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiBaseUrl}api/login/login`, { TenDangNhap: username, MatKhau: password })
      .pipe(map(user => {
        if (user.flag) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.startRefreshTokenTimer();
        }
        return user;
      }));
  }

  logout(){
    this.stopRefreshTokenTimer();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentDonVi');
    this.currentUserSubject.next(JSON.parse('{"flag":false}'));
    this.router.navigate(['/home']);
    localStorage.removeItem('isOffice365');
    
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiBaseUrl}api/login/refresh-token`, {})
      .pipe(map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  private startRefreshTokenTimer() {
    let tokenString = '';
    if (this.userValue.value != undefined && this.userValue.value.Token != "") {
      tokenString = this.userValue.value.Token.split('.')[1];
      const jwtToken = JSON.parse(atob(tokenString));
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (5 * 60 * 1000);

      this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

}
