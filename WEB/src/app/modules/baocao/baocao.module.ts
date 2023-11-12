import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaocaoRoutingModule } from './baocao-routing.module';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
  ],
  providers: [MessageService,ConfirmationService],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ToastModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    DialogModule,
    BaocaoRoutingModule
  ]
})
export class BaocaoModule { }
