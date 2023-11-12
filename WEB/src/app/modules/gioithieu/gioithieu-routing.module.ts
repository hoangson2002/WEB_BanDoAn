import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GioithieuComponent } from './gioithieu.component';

const routes: Routes = [
  { path: '', component: GioithieuComponent, data: {  } },
  { path: 'gioithieu', component: GioithieuComponent, data: {  } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GioithieuRoutingModule { }
