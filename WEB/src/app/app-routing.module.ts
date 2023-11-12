import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './modules/_layout/app.layout.component';
import { AuthGuard } from './_core/helper';
import { NotfoundComponent } from './modules/notfound/notfound.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '', component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
      { path: 'giohang', loadChildren: () => import('./modules/giohang/giohang.module').then(m => m.GiohangModule) },
      { path: 'danhmuc', loadChildren: () => import('./modules/danhmuc/danhmuc.module').then(m => m.DanhmucModule) },
      { path: 'quanly', loadChildren: () => import('./modules/quanly/quanly.module').then(m => m.QuanlyModule) },
      { path: 'gioithieu', loadChildren: () => import('./modules/gioithieu/gioithieu.module').then(m => m.GioithieuModule) },
      { path: 'lienhe', loadChildren: () => import('./modules/lienhe/lienhe.module').then(m => m.LienheModule) },
    ],
  },
  { path: 'auth', loadChildren: () => import('./modules/_auth/auth.module').then(m => m.AuthModule) },
  { path: 'pages/notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'pages/notfound' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'}, )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
