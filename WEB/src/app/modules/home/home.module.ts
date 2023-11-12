import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FooterModule } from '../footer/footer.module';
import { TrangchuKhachhangComponent } from './trangchu-khachhang/trangchu-khachhang.component';
import { TrangchuKhachhangModule } from './trangchu-khachhang/trangchu-khachhang.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
