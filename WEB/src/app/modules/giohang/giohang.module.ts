import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiohangRoutingModule } from './giohang-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { GiohangComponent } from './giohang.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DoanDetailModule } from '../home/trangchu-khachhang/doan-detail/doan-detail.module';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [GiohangComponent],
  imports: [
    CommonModule,
    GiohangRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    InputNumberModule,
    FormsModule,
    RadioButtonModule,
    ToastModule,
    DropdownModule,
    InputTextareaModule,
    DoanDetailModule,
    DialogModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class GiohangModule { }
