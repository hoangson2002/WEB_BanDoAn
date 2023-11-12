import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { QuanlyRoutingModule } from './quanly-routing.module';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import {StepsModule} from 'primeng/steps';
import {InputTextareaModule} from 'primeng/inputtextarea';

import {InputMaskModule} from 'primeng/inputmask';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
  declarations: [
  ],
  providers: [MessageService,ConfirmationService],
  imports: [
    CommonModule,
    QuanlyRoutingModule,
    FormsModule,
    InputMaskModule,
    TableModule,
    ButtonModule,
    PanelModule,
    ProgressBarModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    MessageModule,
    CheckboxModule,
    ConfirmDialogModule,
    QuanlyRoutingModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ToastModule,
    DialogModule,
    ToolbarModule,
    TreeModule,
    CalendarModule,
    InputNumberModule,
    DropdownModule,
    FileUploadModule,
    StepsModule,
    InputTextareaModule,
    QuanlyRoutingModule
  ],
})
export class QuanlyModule { }
