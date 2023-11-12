import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DoanDetailService } from './doan-detail.service';
import { first } from 'rxjs';
import { DoAnViewModel } from '../model/doan-view-model';
import { DatHangDoAnViewModel } from './model/order-doan-view-mode';
import { MessageService } from 'primeng/api';
import { TrangchuKhachhangService } from '../trangchu-khachhang.service';
import { AuthService } from 'src/app/_core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doan-detail',
  templateUrl: './doan-detail.component.html',
  styleUrls: ['./doan-detail.component.scss']
})
export class DoanDetailComponent implements OnInit {
  DoAnDetailDialog: boolean = true;
  @Input() ID_MonAn: number = 0;
  @Output() closeDetailDoAn =  new EventEmitter<boolean>();

  ID_TaiKhoan: number = this.authService.userValue.value?.TaiKhoan?.ID_TaiKhoan || 0;

  DataDetail: DoAnViewModel = new DoAnViewModel();
  Obj_Order: DatHangDoAnViewModel = new DatHangDoAnViewModel();;
  constructor(
    private detailService: DoanDetailService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private trangchuKhachhangService: TrangchuKhachhangService
  ) { }

  ngOnInit(): void {
    this.loadChiTietSanPham();
  }
  
  loadChiTietSanPham(){
    this.detailService.GetListPhanLoaiDoAn(this.ID_MonAn).pipe(first()).subscribe(data=>{
      this.DataDetail = data[0];
    })
  }
  Dong(){
    this.closeDetailDoAn.emit(false);
  }

  ThemDonHang(){
    if(this.ID_TaiKhoan == 0 || !this.ID_TaiKhoan){
      this.router.navigate(['/auth/login']);
    }else{
      this.trangchuKhachhangService.DonHangInsertOrUpdate({
        ID_DonHang: 0,
        ID_MonAn: this.ID_MonAn,
        SoLuong: this.Obj_Order.SoLuong,
        Type: 'THEMMOI'
      }).pipe(first()).subscribe(data=>{
        if(data.flag){
          this.messageService.add({ key: 'trangchu', severity: 'success', summary: 'Thông báo', detail: data.msg});
          this.Dong();
        }else{
          this.messageService.add({ key: 'trangchu', severity: 'warn', summary: 'Thông báo', detail: data.msg});
          this.Dong();
        }
      },(error)=>{
        this.messageService.add({ key: 'trangchu', severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!'})
      })
    }
  }
}
