import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiohangComponent } from './giohang.component';

const routes: Routes = [
  {path: '',  component: GiohangComponent},
  {path: 'giocongviec-giamdinhvien', component: GiohangComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiohangRoutingModule { }
