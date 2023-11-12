import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DonHangInsertOrUpdateViewModel } from '../home/trangchu-khachhang/model/donhang-insert-or-update-view-model';
import { ThanhToanDonHangViewModel } from './model/thanhtoan-donhang-view-model';
import { ComBoBoxViewModel } from '../danhmuc/monan/model/combobox-view-model';

@Injectable({
  providedIn: 'root'
})
export class GiohangService {

  constructor(private http: HttpClient) { }
  GetListGioHang() {
    return this.http.get<any[]>(`${environment.apiBaseUrl}api/giohang/getlistdonhangbyidtaikhoan`);
  }
  GetSoLuongDonHangTrongGio() {
    return this.http.get<any>(`${environment.apiBaseUrl}api/giohang/getsoluongdonhangtronggiohang`);
  }
  DonHangInsertOrUpdate(obj: DonHangInsertOrUpdateViewModel) {
    return this.http.post<any>(`${environment.apiBaseUrl}api/giohang/donhanginsertorupdate`, obj);
  }

  TimPhieuGiamGia(MaKhuyenMai: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}api/quantri/timphieugiamgia?MaKhuyenMai=${MaKhuyenMai}`);
  }

  //#region Thanh toán đơn hàng
  ThanhToanDonHangInsertOrUpdate(obj: ThanhToanDonHangViewModel) {
    return this.http.post<any>(`${environment.apiBaseUrl}api/thanhtoan/thanhtoandonhanginsertorupdate`, obj);
  }
  //#endregion

  //#region Combobox
  ComboboxTinhThanh() {
    return this.http.get<ComBoBoxViewModel[]>(`${environment.apiBaseUrl}api/combobox/comboboxtinhthanh`);
  }
  ComboboxQuanHuyen(ID_TinhThanh: number) {
    return this.http.get<ComBoBoxViewModel[]>(`${environment.apiBaseUrl}api/combobox/comboboxquanhuyen?ID_TinhThanh=${ID_TinhThanh}`);
  }
  ComboboxPhuongXa(ID_QuanHuyen: number) {
    return this.http.get<ComBoBoxViewModel[]>(`${environment.apiBaseUrl}api/combobox/comboboxphuongxa?ID_QuanHuyen=${ID_QuanHuyen}`);
  }
  //#endregion
}
