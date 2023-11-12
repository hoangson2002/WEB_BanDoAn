import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MonAnViewModel, NguyenLieuMonAnViewModel } from './model/monan-view-model';
import { ComBoBoxViewModel } from './model/combobox-view-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonanService {

  constructor(private http: HttpClient) { }

  GetListMonAn(ID_MonAnTrangThai: number, ID_MonAnPhanLoai: number, TenMonAn: string) {
    return this.http.get<MonAnViewModel[]>(`${environment.apiBaseUrl}api/quantri/getlistmonan?ID_MonAnTrangThai=${ID_MonAnTrangThai}&ID_MonAnPhanLoai=${ID_MonAnPhanLoai}&TenMonAn=${TenMonAn}`);
  }

  GetListNguyenLieuMonAn(ID_MonAn: number) {
    return this.http.get<NguyenLieuMonAnViewModel[]>(`${environment.apiBaseUrl}api/quantri/getlistnguyenlieumonan?ID_MonAn=${ID_MonAn}`);
  }

  InsertOrUpdateMonAn(obj: MonAnViewModel) {
    return this.http.post<any>(`${environment.apiBaseUrl}api/quantri/monaninsertorupdate`, obj);
  }

  SaveFile(filesToUpload: any, ID_MonAn: number): Observable<any> {
    const formData: FormData = new FormData();

    for (let file of filesToUpload)
      formData.append('file', file);

    let headers = new HttpHeaders();
    return this.http.post<any>(`${environment.apiBaseUrl}api/quantri/save_file?ID_MonAn=${ID_MonAn}`, formData, { headers: headers });
  }

  DeleteMonAn(ListID: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/deletemonan?ListID=${ListID}`);
  }

  ComboboxPhanLoaiMonAn(){
    return this.http.get<ComBoBoxViewModel[]>(`${environment.apiBaseUrl}api/quantri/comboboxphanloaimonan`);
  }
  ComboboxTrangThaiMonAn(){
    return this.http.get<ComBoBoxViewModel[]>(`${environment.apiBaseUrl}api/quantri/comboboxtrangthaimonan`);
  }
  ComboboxNguyenLieu(){
    return this.http.get<ComBoBoxViewModel[]>(`${environment.apiBaseUrl}api/quantri/comboboxnguyenlieu`);
  }
}
