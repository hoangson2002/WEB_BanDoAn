import { Component, OnInit } from '@angular/core';
import { first, forkJoin, map } from 'rxjs';
import { TrangchuKhachhangService } from './trangchu-khachhang.service';
import { DoAnViewModel } from './model/doan-view-model';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

const path = environment.apiBaseUrl;
@Component({
  selector: 'app-trangchu-khachhang',
  templateUrl: './trangchu-khachhang.component.html',
  styleUrls: ['./trangchu-khachhang.component.scss'],
})
export class TrangchuKhachhangComponent implements OnInit {
  layout: string = 'grid';//list
  ComboboxSort: any[] = [
    { label: 'Giá từ thấp đến cao', value: 1 },
    { label: 'Giá từ cao đến thấp', value: 2 },
  ];
  ID_TaiKhoan: number = this.authService.userValue.value?.TaiKhoan?.ID_TaiKhoan || 0;
  ValueSort: number = 0;
  ValueSearch: string = '';
  constructor(
    private trangchuKhachhangService: TrangchuKhachhangService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.loadTrangChuKhachHang();
  }

  ID_CurrentTab: number = 0;
  activeTabView(ID: number){
    this.ID_CurrentTab = ID;
    this.TimKiemDoAn(ID);
    this.ListPhanLoaiMonAn = this.ListPhanLoaiMonAn.map(item => {
      item.active = (item.ID === ID);
      return item;
    });
  }
  //#region Load
  ListPhanLoaiMonAn: any[] = [];
  ListDoAn: DoAnViewModel[] = [];
  ListMonAnDUocMuaNhieuNhat: any[] = [];
  loadTrangChuKhachHang(){
    forkJoin([
      this.trangchuKhachhangService.GetListPhanLoaiDoAn().pipe(),
      this.trangchuKhachhangService.TimKiemDoAn(0, '', 0),
      this.trangchuKhachhangService.MonAnDuocMuaNhieuNhat(),

    ]).pipe(first()).subscribe({
      next: (res) => {
        let res_PhanLoaiDoAn = res[0];
        res_PhanLoaiDoAn.unshift({ID: 0, Value: 'Tất cả', active: true})
        let res_DoAn = res[1];

        this.ListDoAn = res_DoAn;
        this.ListPhanLoaiMonAn = res_PhanLoaiDoAn;
        this.ListMonAnDUocMuaNhieuNhat = res[2];
      }
    })
  }
  //#endregion

  getSeverity(isOrder: string) {
    if(!isOrder){
      return 'danger';
    }else{
      return 'success';
    }
  };

  //#region Tìm kiếm đồ ăn
 
  TimKiemDoAn(ID_LoaiMonAn: number) {
    this.trangchuKhachhangService.TimKiemDoAn(ID_LoaiMonAn,this.ValueSearch, this.ValueSort).pipe(first()).subscribe(data => {
      if(data.length == 0){
        this.ListDoAn = [];
      }else{
        this.ListDoAn = data;
      }
    })
  }
  //#endregion

  //#region Chi tiết đồ ăn
  showDetailDoAnDialog: boolean = false;
  ID_MonAn: number = 0;
  ShowDetailDoAn(ID_MonAn: number){
    this.ID_MonAn = ID_MonAn;
    this.showDetailDoAnDialog = true;
  }

  hideDetailDoAnDialog(value: boolean) {
    this.showDetailDoAnDialog = false;
  }
  //#endregion

  
  //#region Thêm đơn hàng
  ThemDonHang(ID_MonAn: number){
    if(this.ID_TaiKhoan == 0 || !this.ID_TaiKhoan){
      this.router.navigate(['/auth/login']);
    }else{
      this.trangchuKhachhangService.DonHangInsertOrUpdate({
        ID_DonHang: 0,
        ID_MonAn: ID_MonAn,
        SoLuong: 1,
        Type: 'THEMMOI'
      }).pipe(first()).subscribe(data=>{
        if(data.flag){
          this.messageService.add({ key: 'trangchu', severity: 'success', summary: 'Thông báo', detail: data.msg});
          this.activeTabView(this.ID_CurrentTab);
        }else{
          this.messageService.add({ key: 'trangchu', severity: 'warn', summary: 'Thông báo', detail: data.msg});
          this.activeTabView(this.ID_CurrentTab);
        }
      },(error)=>{
        this.activeTabView(this.ID_CurrentTab);
        this.messageService.add({ key: 'trangchu', severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!'})
      })
    }
  }
  //#endregion
}
