import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaiKhoanViewModel } from './model/taikhoan-view-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuanlyNguoisudungService {

  constructor(
    private http:HttpClient
  ) { }

  getListTaiKHoan(ID_TaiKhoan: number, TenDayDu: string, TenDangNhap: string, IsLock: number, IsKhachHang: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/taikhoan/getlisttaikhoan?ID_TaiKhoan=${ID_TaiKhoan}&TenDayDu=${TenDayDu}&TenDangNhap=${TenDangNhap}&IsLock=${IsLock}&IsKhachHang=${IsKhachHang}`);
  }

  khoaTaiKhoan(ID_TaiKhoan: number, IsLock: boolean) {
    return this.http.post<any>(`${environment.apiBaseUrl}api/taikhoan/khoaTaiKhoan?ID_TaiKhoan=${ID_TaiKhoan}&IsLock=${IsLock}`, {});
  }

  xoaTaiKhoan(ListID: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/taikhoan/xoaTaiKhoan?ListID=${ListID}`);
  }
}
