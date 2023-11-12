import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CauHinhBannerViewModel } from './model/cauhinh-banner-view-model';

@Injectable({
  providedIn: 'root'
})
export class CauhinhBannerService {

  constructor(private http: HttpClient) { }

  GetListCauHinh() {
    return this.http.get<CauHinhBannerViewModel[]>(`${environment.apiBaseUrl}api/quantri/getlistbannerconfig`);
  }

  InsertOrUpdateCauHinh(obj: any) {
    return this.http.post<any>(`${environment.apiBaseUrl}api/quantri/bannerconfiginsertorupdate`,obj);
  }

  DeleteCauHinh(ListID: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/deletebannerconfig?ListID=${ListID}`);
  }
}
