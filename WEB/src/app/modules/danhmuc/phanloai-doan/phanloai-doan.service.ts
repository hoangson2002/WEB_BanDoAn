import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PhanLoaiDoAnViewModel } from './model/phanloai-doan-view-model';

@Injectable({
  providedIn: 'root'
})
export class PhanloaiDoanService {

  constructor(private http: HttpClient) { }

  GetListPhanLoaiDoAn() {
    return this.http.get<PhanLoaiDoAnViewModel[]>(`${environment.apiBaseUrl}api/quantri/getlistphanloaimonan`);
  }

  InsertOrUpdatePhanLoai(ID_MonAnPhanLoai: number, TenMonAnPhanLoai: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/phanloaidoaninsertorupdate?ID_MonAnPhanLoai=${ID_MonAnPhanLoai}&TenMonAnPhanLoai=${TenMonAnPhanLoai}`);
  }

  DeletePhanLoaiMonAn(ListID: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/deletephanloaimonan?ListID=${ListID}`);
  }
}
