import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaikhoanDoimatkhauService {

  constructor(private http: HttpClient) { }

  DoiMatKhau(MatKhauCu: string, MatKhauMoi: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/taikhoan/doimatkhau?MatKhauCu=${MatKhauCu}&MatKhauMoi=${MatKhauMoi}`);
  }
}
