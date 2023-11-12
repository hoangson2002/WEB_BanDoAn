import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrangchuKhachhangComponent } from './trangchu-khachhang/trangchu-khachhang.component';

const routes: Routes = [
  {
    path: '', component: TrangchuKhachhangComponent,
    loadChildren: () =>  import('./trangchu-khachhang/trangchu-khachhang.module').then((m) => m.TrangchuKhachhangModule),
  },
  // {
  //   path: '', component: TrangchuKhachhangComponent,
  //   loadChildren: () =>  import('./hometoda/hometoda.module').then((m) => m.HometodaModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
