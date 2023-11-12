import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  TaiKhoanInsert(obj : any) {
    return this.http.post<any>(`${environment.apiBaseUrl}api/taikhoan/signup`, obj);
  }
}
