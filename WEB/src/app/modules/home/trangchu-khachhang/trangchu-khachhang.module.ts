import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrangchuKhachhangRoutingModule } from './trangchu-khachhang-routing.module';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { FooterModule } from '../../footer/footer.module';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderModule } from '../../header/header.module';
import { TrangchuKhachhangComponent } from './trangchu-khachhang.component';
import { IonicModule } from '@ionic/angular';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DataViewLayoutOptions, DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { DoanDetailModule } from './doan-detail/doan-detail.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    TrangchuKhachhangComponent,
  ],
  imports: [
    CommonModule,
    TrangchuKhachhangRoutingModule,
    ChartModule,
    TabViewModule,
    FooterModule,
    DropdownModule,
    HeaderModule,
    IonicModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    DataViewModule,
    RatingModule,
    InputTextModule,
    FormsModule,
    DoanDetailModule,
    ToastModule
  ],
  providers: [MessageService, ConfirmationService],
  exports: [
    DataViewLayoutOptions
  ],
})
export class TrangchuKhachhangModule { }
