import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhmucRoutingModule } from './danhmuc-routing.module';
import { CauhinhBannerComponent } from './cauhinh-banner/cauhinh-banner.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PhanloaiDoanComponent } from './phanloai-doan/phanloai-doan.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NguyenlieuComponent } from './nguyenlieu/nguyenlieu.component';
import { MonanComponent } from './monan/monan.component';
import { QuanlyNguoisudungComponent } from './quanly-nguoisudung/quanly-nguoisudung.component';
import { TaikhoanDetailComponent } from './quanly-nguoisudung/taikhoan-detail/taikhoan-detail.component';
import { TaikhoanDetailModule } from './quanly-nguoisudung/taikhoan-detail/taikhoan-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DanhmucRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    TaikhoanDetailModule
  ],
  declarations: [
    CauhinhBannerComponent,
    PhanloaiDoanComponent,
    NguyenlieuComponent,
    MonanComponent,
    QuanlyNguoisudungComponent,
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class DanhmucModule { }