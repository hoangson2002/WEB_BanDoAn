import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NguyenLieuViewModel } from './model/nguyenlieu-view-model';

@Injectable({
  providedIn: 'root'
})
export class NguyenlieuService {

  constructor(private http: HttpClient) { }

  GetLisNguyenLieu() {
    return this.http.get<NguyenLieuViewModel[]>(`${environment.apiBaseUrl}api/quantri/getlistnguyenlieu`);
  }

  InsertOrUpdateNguyenLieu(ID_NguyenLieu: number, TenNguyenLieu: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/nguyenlieuinsertorupdate?ID_NguyenLieu=${ID_NguyenLieu}&TenNguyenLieu=${TenNguyenLieu}`);
  }

  DeleteNguyenLieu(ListID: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/deletenguyenlieu?ListID=${ListID}`);
  }
}
