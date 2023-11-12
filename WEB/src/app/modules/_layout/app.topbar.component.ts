import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../../_core/services/auth.service';
import { UserSessionModel } from '../../_core/models/user-session-model';
import { Router } from '@angular/router';
import { GiohangService } from '../giohang/giohang.service';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';



@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];
    menuItems!: MenuItem[];
    user!: UserSessionModel;
    fullName!: string;
    ID_TaiKhoan: number = 0;
    SoLuongDonDaDat: number = 0;
    constructor(public layoutService: LayoutService,
        private authService: AuthService,
        private giohangService: GiohangService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.user = this.authService.userValue;
        this.ID_TaiKhoan = this.authService.userValue.value?.TaiKhoan?.ID_TaiKhoan || 0;
        this.SoLuongDonDaDat = this.authService.userValue.value?.TaiKhoan?.SoLuongDonDaDat || 0;
        this.menuItems = [
            {
                label: this.user.value?.TaiKhoan?.TenDangNhap, escape: false, icon: 'pi pi-fw pi-id-card'
            },
            {
                label: 'Đổi mật khẩu', icon: 'pi pi-fw pi-refresh'
            },
            {
                separator: true
            },
            {
                label: 'Đăng xuất', icon: 'pi pi-fw pi-sign-out',
                command: (event) => {
                    this.logout();
                }
            },
        ];
        this.fullName = this.user.value?.TaiKhoan?.TenDayDu || '';

    }

    logout() {
        this.authService.logout();
        window.location.href = environment.UIurl;

    }

    openCart() {
        this.router.navigate(['/giohang']);
    }

    login() {
        this.router.navigate(['/auth/login']);
    }



    //#region Đổi mật khẩu
    doiMatKhauDiaLog: boolean = false;
    doimatkhau() {
        this.doiMatKhauDiaLog = true;
    }

    hideDoiMatKhauDiaLog(value: any) {
        this.doiMatKhauDiaLog = false;
    }
    //#endregion
}
