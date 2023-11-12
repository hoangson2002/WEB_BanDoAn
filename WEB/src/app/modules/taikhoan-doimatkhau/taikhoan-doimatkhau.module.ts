import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaikhoanDoimatkhauRoutingModule } from './taikhoan-doimatkhau-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { TaikhoanDoimatkhauComponent } from './taikhoan-doimatkhau.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TaikhoanDoimatkhauComponent],
  imports: [
    CommonModule,
    TaikhoanDoimatkhauRoutingModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DialogModule,
    ToastModule,
    FormsModule
  ],
  exports: [TaikhoanDoimatkhauComponent]
})
export class TaikhoanDoimatkhauModule { }
