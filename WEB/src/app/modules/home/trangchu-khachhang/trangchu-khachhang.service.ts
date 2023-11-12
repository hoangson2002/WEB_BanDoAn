import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DoAnViewModel } from './model/doan-view-model';
import { DonHangInsertOrUpdateViewModel } from './model/donhang-insert-or-update-view-model';

@Injectable({
  providedIn: 'root'
})
export class TrangchuKhachhangService {

  constructor(private http: HttpClient) { }
  GetListPhanLoaiDoAn() {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/getlistphanloaimonan`);
  }
  GetListDoAnByID(ID_DoAn: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/getlistdoanbyid?ID_DoAn=${ID_DoAn}`);
  }
  TimKiemDoAn(ID_MonAnPhanLoai: number, TenMonAn: string, SapXep: number) {
    return this.http.get<DoAnViewModel[]>(`${environment.apiBaseUrl}api/trangchu/timkiemdoan?ID_MonAnPhanLoai=${ID_MonAnPhanLoai}&TenMonAn=${TenMonAn}&SapXep=${SapXep}`);
  }
  MonAnDuocMuaNhieuNhat() {
    return this.http.get<any>(`${environment.apiBaseUrl}api/trangchu/monanduocmuanhieunhat`);
  }

  DonHangInsertOrUpdate(obj: DonHangInsertOrUpdateViewModel) {
    return this.http.post<any>(`${environment.apiBaseUrl}api/giohang/donhanginsertorupdate`,obj);
  }
}
