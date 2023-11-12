import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaiKhoanViewModel } from '../model/taikhoan-view-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaikhoanDetailService {

  constructor(
    private http: HttpClient
  ) { }

  InsertOrUpdateMonAn(obj: TaiKhoanViewModel) {
    return this.http.post<any>(`${environment.apiBaseUrl}api/taikhoan/tai-khoan-insert-or-update`, obj);
  }
}
  