import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LienheRoutingModule } from './lienhe-routing.module';
import { LienheComponent } from './lienhe.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [LienheComponent],
  imports: [
    CommonModule,
    LienheRoutingModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ], 
  exports: [LienheComponent]
})
export class LienheModule { }
