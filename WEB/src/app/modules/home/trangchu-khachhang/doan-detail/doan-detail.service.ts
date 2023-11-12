import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DoAnViewModel } from '../model/doan-view-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoanDetailService {

  constructor(private http: HttpClient) { }

  GetListPhanLoaiDoAn(ID_MonAn: number) {
    return this.http.get<DoAnViewModel[]>(`${environment.apiBaseUrl}api/trangchu/getchitietdoanbyid?ID_MonAn=${ID_MonAn}`);
  }
}