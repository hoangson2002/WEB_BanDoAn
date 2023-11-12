import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaikhoanDetailRoutingModule } from './taikhoan-detail-routing.module';
import { TaikhoanDetailComponent } from './taikhoan-detail.component';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [TaikhoanDetailComponent],
  imports: [
    CommonModule,
    TaikhoanDetailRoutingModule,
    FormsModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    RadioButtonModule
  ],
  exports: [TaikhoanDetailComponent]
})
export class TaikhoanDetailModule { }
