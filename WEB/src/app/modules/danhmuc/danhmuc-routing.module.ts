import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CauhinhBannerComponent } from './cauhinh-banner/cauhinh-banner.component';
import { PhanloaiDoanComponent } from './phanloai-doan/phanloai-doan.component';
import { NguyenlieuComponent } from './nguyenlieu/nguyenlieu.component';
import { MonanComponent } from './monan/monan.component';
import { QuanlyNguoisudungComponent } from './quanly-nguoisudung/quanly-nguoisudung.component';

const routes: Routes = [
  // { path: 'cauhinh-banner', component: CauhinhBannerComponent, data: { breadcrumb: 'Cấu hình banner' } },
  { path: 'phanloai-doan', component: PhanloaiDoanComponent, data: { breadcrumb: 'Phân loại đồ ăn' } },
  { path: 'nguyenlieu', component: NguyenlieuComponent, data: { breadcrumb: 'Danh mục nguyên liệu' } },
  { path: 'monan', component: MonanComponent, data: { breadcrumb: 'Danh mục món ăn' } },
  { path: 'quanly-nguoisudung', component: QuanlyNguoisudungComponent, data: { breadcrumb: 'Quản lý người sử dụng' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhmucRoutingModule { }
