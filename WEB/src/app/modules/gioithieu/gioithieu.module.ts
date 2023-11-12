import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GioithieuRoutingModule } from './gioithieu-routing.module';
import { GioithieuComponent } from './gioithieu.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [GioithieuComponent],
  imports: [
    CommonModule,
    GioithieuRoutingModule,
    ButtonModule
  ],
  exports: [GioithieuComponent]
})
export class GioithieuModule { }
