import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserSessionModel } from 'src/app/_core/models/user-session-model';
import { TaikhoanDoimatkhauService } from './taikhoan-doimatkhau.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-taikhoan-doimatkhau',
  templateUrl: './taikhoan-doimatkhau.component.html',
  styleUrls: ['./taikhoan-doimatkhau.component.css']
})
export class TaikhoanDoimatkhauComponent implements OnInit {

  @Input() DiaLog_DoiMatKhau: any;
  @Output() DoiMatKhauDialogTra = new EventEmitter<boolean>();;

  user!: UserSessionModel;

  constructor(
    private doimatkhauService: TaikhoanDoimatkhauService,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userValue;
  }

  MatKhauCu: string = '';
  MatKhauMoi: string = '';
  NhapLaiMatKhau: string = '';
  validateCheckUndefined() {
    let flag = true;
    if (flag && !this.MatKhauCu) {
      this.messageService.add({ key:'doimatkhau', severity: 'warn', summary: 'Thông báo', detail: 'Chưa nhập mật khẩu cũ !' });
      flag = false;
    }
    if (flag && !this.MatKhauMoi) {
      this.messageService.add({ key:'doimatkhau', severity: 'warn', summary: 'Thông báo', detail: 'Chưa nhập mật khẩu mới !' });
      flag = false;
    }
    if (flag && !this.NhapLaiMatKhau) {
      this.messageService.add({ key:'doimatkhau', severity: 'warn', summary: 'Thông báo', detail: 'Chưa nhập lại mật khẩu mới !' });
      flag = false;
    }
    if (flag &&this.MatKhauMoi == this.MatKhauCu) {
      this.messageService.add({ key:'doimatkhau', severity: 'warn', summary: 'Thông báo', detail: "Mật khẩu mới và mật khẩu cũ không được giống nhau" });
      flag = false;
    }
    if (flag &&this.MatKhauMoi != this.NhapLaiMatKhau) {
      this.messageService.add({ key:'doimatkhau', severity: 'warn', summary: 'Thông báo', detail: "Mật khẩu không trùng khớp" });
      flag = false;
    }
    return flag;
  }


  Save() {
    if (this.validateCheckUndefined()) {
      this.doimatkhauService.DoiMatKhau(this.MatKhauCu, this.MatKhauMoi).subscribe(res => {
          if (res.flag) {
            this.DiaLog_DoiMatKhau = false;
            this.messageService.add({ key:'trangchu', severity: 'success', summary: 'Thông báo', detail: res.msg });
          }
          else {
            this.messageService.add({ key:'doimatkhau', severity: 'warn', summary: 'Thông báo', detail: res.msg });
          }
        },
        (error) => {
          this.DiaLog_DoiMatKhau = false;
        });
    }
  }

  Exit() {
    this.DiaLog_DoiMatKhau = false;
    this.DoiMatKhauDialogTra.emit(false);
  }

  logout() {
    this.authService.logout();
  }

  Close_DiaLog() {
    this.DoiMatKhauDialogTra.emit(false);
  }
}
