import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/modules/_layout/service/app.layout.service';
import { AuthService } from '../../../_core/services/auth.service';
import { Message, MessageService } from 'primeng/api';
import { interval } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { TaiKhoanViewModel } from './model/taikhoan-view-model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./style.css'],

  // styles: [`
  //     :host ::ng-deep .p-password input {
  //         width: 100%;
  //         padding:1rem;
  //     }

  //     :host ::ng-deep .pi-eye{
  //         transform:scale(1.6);
  //         margin-right: 1rem;
  //         color: var(--primary-color) !important;
  //     }

  //     :host ::ng-deep .pi-eye-slash{
  //         transform:scale(1.6);
  //         margin-right: 1rem;
  //         color: var(--primary-color) !important;
  //     }
  // `]
})
export class LoginComponent implements OnInit {
  @ViewChild('tendangnhap') tendangnhap?: ElementRef;

  loadtime: number = 0;

  intervalCheckExistElemnt = interval(400);
  subscription: any;

  valCheck: string[] = ['remember'];
  msgs: Message[] = [];

  username!: string;
  password!: string;

  default_language = 'vi';
  listLanguage: any[] = [];
  selectedLanguage: any;

  show_form_login: boolean = false;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    console.warn("obj", this.obj);

    this.loadtime = 0;
    if (this.authService.userValue.flag) {
      this.router.navigate(['/main/todawork']);
    }

    this.formGroup = new FormGroup({
      selectedCategory: new FormControl()
    });
  }

  signin() {
    if (!navigator.onLine) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Không có kết nối Internet.Vui lòng thử lại !' });
      return;
    }

    this.authService.login(this.username, this.password).pipe(first()).subscribe(data => {
      if (data.flag) {
        this.router.navigate(['/home']);
      }
      else {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: data.msg });
      }
    }, (error) => {
      console.log("lỗi đăng nhập", error);
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Không có kết nối Internet hoặc lỗi kết nối.Vui lòng thử lại !' });
    });

  }
  toggleForm(): void {
    const container: HTMLElement | null = document.querySelector('.container');

    if (container) {
      container.classList.toggle('active');
    }
  }

  //#region Đăng kí tài khoản
  selectedCategory: any[] = [];
  obj: TaiKhoanViewModel = new TaiKhoanViewModel();
  formGroup!: FormGroup;

  signup() {
    if (this.validate()) {
      this.loginService.TaiKhoanInsert({
        ID_TaiKhoan: 0,
        TenDayDu: this.obj.TenDayDu,
        TenDangNhap: this.obj.TenDangNhap,
        MatKhau: this.obj.MatKhau,
        ID_ChucDanh: 8, //Khách hàng
      }).subscribe(data => {
        if (data.flag) {
          this.messageService.add({ severity: 'success', summary: 'Thông báo', detail: data.msg });
          this.username = this.obj.TenDangNhap;
          this.password = this.obj.MatKhau;
          this.signin();
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: data.msg });
        }
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Tác vụ thực hiện thất bại!' });
      })
    }
  }

  validate() {
    let flag = true;
    const regexpemail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const regexpsdt = /0[987532][0-9]{8,9}$/;
    const regexptdn = /^[a-zA-Z0-9]+$/;

    if (flag && !this.obj.TenDayDu.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Họ tên không được để trống!', });
      document.getElementById('tendaydu')?.focus();
      flag = false;
    }

    if (flag && !this.obj.TenDangNhap.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Tên đăng nhập không được để trống !', });
      document.getElementById('username')?.focus();
      flag = false;
    }

    if (flag && !regexptdn.test(this.obj.TenDangNhap)) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Tên đăng nhập không được chứa ký tự đặc biệt!', });
      document.getElementById('username')?.focus();
      flag = false;
    }

    if (flag && !this.obj.MatKhau || flag && this.obj.MatKhau == '') {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Vui lòng nhập mật khẩu!', });
      document.getElementById('username')?.focus();
      flag = false;
    }

    if (flag && this.obj.MatKhau != this.obj.XacNhanMatKhau) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Mật khẩu không trùng khớp!', });
      document.getElementById('username')?.focus();
      flag = false;
    }

    // if (!this.obj.SoDienThoai.trim()) {
    //   this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Số điện thoại không được để trống !', });
    //   document.getElementById('sdt_user')?.focus();
    //   return false;
    // }

    // if (!regexpsdt.test(this.obj.SoDienThoai.trim())) {
    //   this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Số điện thoại không đúng định dạng!', });
    //   document.getElementById('sdt_user')?.focus();
    //   return false;
    // }

    return flag;
  }
  //#endregion
}
