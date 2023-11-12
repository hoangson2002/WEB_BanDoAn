import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import {ToastModule} from 'primeng/toast';

import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { IonicModule } from '@ionic/angular';
import { TrangchuKhachhangModule } from '../home/trangchu-khachhang/trangchu-khachhang.module';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderModule } from '../header/header.module';
import { TaikhoanDoimatkhauModule } from '../taikhoan-doimatkhau/taikhoan-doimatkhau.module';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        BreadcrumbComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        ButtonModule,
        CardModule,
        SidebarModule,
        ToastModule,
        BadgeModule,
        DialogModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        TooltipModule,
        RouterModule,
        MenuModule,
        
        IonicModule,
        TrangchuKhachhangModule,
        DropdownModule,
        HeaderModule,
        IonicModule,
        TaikhoanDoimatkhauModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
