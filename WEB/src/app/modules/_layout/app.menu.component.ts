import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { first } from 'rxjs';
import { MenuService } from './app.menu.service';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public menuservice: MenuService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Trang chủ',
                items: [
                    { label: 'Trang chủ', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
                ]
            },
            {
                label: 'Danh mục',
                items: [
                    // { label: 'Cấu hình banner', icon: 'pi pi-fw pi-bookmark', routerLink: ['/danhmuc/cauhinh-banner'] },
                    { label: 'Danh mục phân loại món ăn', icon: 'pi pi-fw pi-bookmark', routerLink: ['/danhmuc/phanloai-doan'] },
                    { label: 'Danh mục món ăn', icon: 'pi pi-fw pi-bookmark', routerLink: ['/danhmuc/monan'] },
                    { label: 'Danh mục nguyên liệu', icon: 'pi pi-fw pi-bookmark', routerLink: ['/danhmuc/nguyenlieu'] },
                ] ,data: { breadcrumb: 'Danh mục' }
            },
            {
                label: 'Quản trị',
                items: [
                    { label: 'Quản lý người sử dụng', icon: 'pi pi-fw pi-bookmark', routerLink: ['/danhmuc/quanly-nguoisudung'] },
                    { label: 'Quản lý nhóm người sử dụng', icon: 'pi pi-fw pi-bookmark', routerLink: ['/danhmuc/cauhinh-banner'] },
                    { label: 'Quản lý nhóm quyền', icon: 'pi pi-fw pi-bookmark', routerLink: ['/danhmuc/cauhinh-banner'] },
                ] ,data: { breadcrumb: 'Quản trị' }
            },
        ];
    }
}
