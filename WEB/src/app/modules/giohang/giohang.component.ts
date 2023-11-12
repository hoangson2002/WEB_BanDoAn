import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiohangService } from './giohang.service';
import { first } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_core/services/auth.service';
import { ComBoBoxViewModel } from '../danhmuc/monan/model/combobox-view-model';
import { ThanhToanDonHangViewModel } from './model/thanhtoan-donhang-view-model';
const path = environment.apiBaseUrl;

enum THANH_TOAN {
  SAU_KHI_NHAN_HANG = 1,
  QR_CODE = 3,
}
@Component({
  selector: 'app-giohang',
  templateUrl: './giohang.component.html',
  styleUrls: ['./giohang.component.scss']
})
export class GiohangComponent implements OnInit {

  loading_grid_giohang: boolean = false;
  ListGioHang: any[] = [];
  SelectGioHang: any[] = [];
  cols: any[] = [
    { field: 'STT', header: 'STT', width: '8px', align: 'center' },
    { field: 'HinhAnhTheHien', header: 'Hình ảnh', width: '80px', align: 'center' },
    { field: 'TenMonAn', header: 'Tên đồ ăn', width: '100px', align: 'center' },
    { field: 'DonGia', header: 'Đơn giá', width: '100px', align: 'center' },
    { field: 'SoLuong', header: 'Số lượng', width: '100px', align: 'center' },
    { field: 'ThanhTien', header: 'Thành tiền', width: '100px', align: 'center' },
  ];
  ID_TaiKhoan: number = this.authService.userValue.value?.TaiKhoan?.ID_TaiKhoan || 0;

  constructor(
    private giohangService: GiohangService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.isThanhToan = false;
    this.LoadGridGioHang();
    this.loadcomboxbox();
  }
  LoadGridGioHang(){
    this.loading_grid_giohang = true;
    this.SelectGioHang = [];
    this.giohangService.GetListGioHang().pipe(first()).subscribe(data=>{
      if(data.length == 0){
        this.ListGioHang = [];
        this.messageService.add({severity:'info', summary: 'Thông báo', detail: 'Không có dữ liệu!'});
        this.loading_grid_giohang = false;
      }else{
        this.loading_grid_giohang = false;
        data.forEach(element => {
          element.AnhMinhHoa  = path + element.AnhMinhHoa;
        });
        this.ListGioHang = data;
      }
    })
  }

  //#region  Cập nhật đơn hàng
  capNhatDonHang(rowData: any){
    if(this.ID_TaiKhoan == 0){
      this.router.navigate(['/auth/login']);
    }else{
      this.giohangService.DonHangInsertOrUpdate({
        ID_DonHang: rowData.ID_DonHang,
        ID_MonAn: rowData.ID_MonAn,
        SoLuong: rowData.SoLuong,
        Type: 'CAPNHAT'
      }).pipe(first()).subscribe(data=>{
        this.LoadGridGioHang()
      },(error)=>{
        this.LoadGridGioHang()
      })
    }
  }
  //#endregion

  //#region Tính số tiền
  GioHangSoTienTamTinh: number = 0;
  TongTienThanhToan: number = 0;
  onSelectAllDonHang($event: any){
    this.TinhLaiSoTien();
    
  }

  onRowSelectDonHang(event: any) {
    this.TinhLaiSoTien();
  }

  
  onRowUnselectDonHang(event: any) {
    this.TinhLaiSoTien();

  }

  TinhLaiSoTien(){
    const soTienKhuyenMai  = this.ListUuDai.find(x=>x.ID_KhuyenMai == this.SelectedKhuyenMai);
    this.GioHangSoTienTamTinh = this.SelectGioHang.map(x => x.ThanhTien).reduce((partialSum, a) => partialSum + a, 0);
    this.TongTienThanhToan = this.GioHangSoTienTamTinh;
    if(soTienKhuyenMai){
      this.TongTienThanhToan = this.GioHangSoTienTamTinh - soTienKhuyenMai.TienGiamGia;
      this.TongTienThanhToan = this.TongTienThanhToan > 0 ? this.TongTienThanhToan : 0;
    }
  }
  //#endregion

  //#region Phiếu ưu đãi
  SelectedKhuyenMai: number = 0;
  MaUuDai: string = '';
  ListUuDai: any[] = [];
  SelectUuDai: any[] = [];

  themUuDai(){
    this.giohangService.TimPhieuGiamGia(this.MaUuDai).pipe(first()).subscribe(data=>{
      if(this.validateUuDai(data)){
        this.ListUuDai.push({
          ID_KhuyenMai: data.ID_KhuyenMai,
          MaKhuyenMai: data.MaKhuyenMai,
          TienGiamGia: data.TienGiamGia,
          MoTa: data.MoTa,
        })
        this.SelectedKhuyenMai = data.ID_KhuyenMai;
        this.TinhLaiSoTien();
      }
    })
  }

  validateUuDai(data){
    let flag = true;

    if(flag && !data){
      this.messageService.add({ key: 'giohang', severity: 'warn', summary: 'Thông báo', detail: 'Mã ưu đãi không tồn tại hoặc đã hết hạn!'})
      flag = false;
    }

    if(flag && data.ID_KhuyenMai > 0 && this.ListUuDai.find(x=>x.ID_KhuyenMai == data.ID_KhuyenMai)) {
      this.messageService.add({ key: 'giohang', severity: 'warn', summary: 'Thông báo', detail: 'Mã ưu đãi đã được thêm!'})
      flag = false;
    }

    return flag;
  }

  //#endregion

  //#region Thanh toán đơn hàng
  URL_QR_CODE: string = '';
  isThanhToan: boolean = false;

  thanhToan(){
    this.isThanhToan = true;
  }

  thanhToanDonHang(){
    if(this.validateThanhToan()){
      this.obj_thanhtoan.ID_HinhThuc_ThanhToan = this.HinhThucThanhToan;
      this.obj_thanhtoan.TongTienDonHang = this.TongTienThanhToan;
      this.obj_thanhtoan.listID_DonHang = this.SelectGioHang.map(x=>x.ID_DonHang).toString() || '';
      this.giohangService.ThanhToanDonHangInsertOrUpdate(this.obj_thanhtoan).subscribe(data=>{
        if(data.flag){
          this.messageService.add({ key: 'giohang', severity: 'success', summary: 'Thông báo', detail: data.msg });
          if(this.obj_thanhtoan.ID_HinhThuc_ThanhToan == THANH_TOAN.QR_CODE) {
            this.URL_QR_CODE = this.getUrlQrCode(this.obj_thanhtoan.TongTienDonHang, this.obj_thanhtoan.GhiChu, 'Hoàng Tuấn Sơn');
            this.isQrCodeDialog = true;
          }else{
          this.LoadGridGioHang();
          }
        }else{
          this.messageService.add({ key: 'giohang', severity: 'warn', summary: 'Thông báo', detail: data.msg });
        }
      },(error)=>{
        this.messageService.add({ key: 'giohang', severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!'});
      })
    }
  }

  validateThanhToan(){
    let flag = true;

    if(!this.obj_thanhtoan.NguoiNhan_HoTen){
      this.messageService.add({ key: 'giohang', severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng nhập họ tên người mua hàng!'});
      document.getElementById("NguoiNhan_HoTen")?.focus();
      flag = false;
    }

    if(!this.obj_thanhtoan.NguoiNhan_SoDienThoai){
      this.messageService.add({ key: 'giohang', severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng nhập số điện thoại!'});
      document.getElementById("NguoiNhan_SoDienThoai")?.focus();
      flag = false;
    }

    if(!this.obj_thanhtoan.ID_TinhThanh){
      this.messageService.add({ key: 'giohang', severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng chọn tỉnh thành!'});
      document.getElementById("ID_TinhThanh")?.focus();
      flag = false;
    }

    if(!this.obj_thanhtoan.ID_QuanHuyen){
      this.messageService.add({ key: 'giohang', severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng chọn quận huyện!'});
      document.getElementById("ID_QuanHuyen")?.focus();
      flag = false;
    }

    if(!this.obj_thanhtoan.ID_PhuongXa){
      this.messageService.add({ key: 'giohang', severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng chọn phường xã!'});
      document.getElementById("ID_PhuongXa")?.focus();
      flag = false;
    }

    return flag
  }

  QuayLai(){
    this.LoadGridGioHang();
    this.isThanhToan = false;
  }
  //#endregion

  //#region Địa giới hành chính
  obj_thanhtoan: ThanhToanDonHangViewModel = new ThanhToanDonHangViewModel();
  ComboboxTinhThanh: ComBoBoxViewModel[] = [];
  ComboboxQuanHuyen: ComBoBoxViewModel[] = [];
  ComboboxPhuongXa: ComBoBoxViewModel[] = [];
  HinhThucThanhToan: number = 1;
  ComboboxHinhThucThanhToan: ComBoBoxViewModel[] = [
    { ID: 1, Value: 'Thanh toán sau khi nhận hàng' },
    { ID: 3, Value: 'Thanh toán bằng QR' },
  ]

  onChangeDiaChi() {
    const phuongXa = this.ComboboxPhuongXa.find(x => x.ID == this.obj_thanhtoan.ID_PhuongXa);
    const quanHuyen = this.ComboboxQuanHuyen.find(x => x.ID == this.obj_thanhtoan.ID_QuanHuyen);
    const tinhThanh = this.ComboboxTinhThanh.find(x => x.ID == this.obj_thanhtoan.ID_TinhThanh);

    if( this.obj_thanhtoan.SoNha && phuongXa && quanHuyen && tinhThanh )
      this.obj_thanhtoan.DiaChiNhanHang = this.obj_thanhtoan.SoNha + ', ' + phuongXa.Value + ', ' + quanHuyen.Value + ', ' + tinhThanh.Value;
  }
  
  onChangeLoadQuanHuyen(event: any) {
    const ID_TinhThanh = event.value || 0;
    this.giohangService.ComboboxQuanHuyen(ID_TinhThanh).pipe(first()).subscribe(data => {
      this.ComboboxQuanHuyen = data;
    });
    this.ComboboxPhuongXa = [];
  }

  onChangeLoadPhuongXa(event: any) {
    const ID_QuanHuyen = event.value || 0;
    this.giohangService.ComboboxPhuongXa(ID_QuanHuyen).pipe(first()).subscribe(data => {
      this.ComboboxPhuongXa = data;
    });
  }

  loadcomboxbox(){
    this.giohangService.ComboboxTinhThanh().pipe(first()).subscribe(data => {
      this.ComboboxTinhThanh = data;
    });
  }
  //#endregion


  BatDau(){
    this.router.navigate(['/home'])
  }

  
  //#region Chi tiết đồ ăn
  showDetailDoAnDialog: boolean = false;
  ID_MonAn: number = 0;
  ShowDetailDoAn(ID_MonAn: number){
    this.ID_MonAn = ID_MonAn;
    this.showDetailDoAnDialog = true;
  }

  hideDetailDoAnDialog(value: boolean) {
    this.LoadGridGioHang();
    this.showDetailDoAnDialog = false;
  }
  //#endregion

  //#region gen QR Code
  isQrCodeDialog: boolean = false;
  private getUrlQrCode(amount: number, addInfo: string, accountName: string) {
    return `https://img.vietqr.io/image/vpbank-0329363264-compact2.jpg?amount=${amount}&addInfo=${addInfo}&accountName=${accountName}`;
  }

  hideQrCodeDialog(){
    this.URL_QR_CODE = '';
    this.LoadGridGioHang();
    this.isQrCodeDialog = false;
  }
  //#endregion

}
