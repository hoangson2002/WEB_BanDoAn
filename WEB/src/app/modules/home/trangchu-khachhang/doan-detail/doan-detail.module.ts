import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoanDetailRoutingModule } from './doan-detail-routing.module';
import { DialogModule } from 'primeng/dialog';
import { DoanDetailComponent } from './doan-detail.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [DoanDetailComponent],
  imports: [
    CommonModule,
    DoanDetailRoutingModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    InputNumberModule
  ],
  exports: [DoanDetailComponent]
})
export class DoanDetailModule { }
