import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path: '', component: QuanlyNhanvienComponent},
  // {path: 'quanly-nhanvien',  component: QuanlyNhanvienComponent, data: { breadcrumb: 'Nhân viên' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanlyRoutingModule { }
