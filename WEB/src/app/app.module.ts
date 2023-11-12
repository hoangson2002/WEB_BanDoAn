import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { AppLayoutModule } from './modules/_layout/app.layout.module';
import { appInitializer, ErrorInterceptor, JwtInterceptor } from './_core/helper';
import { AuthService } from './_core/services/auth.service';
import { FooterModule } from './modules/footer/footer.module';
import { HeaderModule } from './modules/header/header.module';
import { LienheComponent } from './modules/lienhe/lienhe.component';
import { ThongtinTaikhoanComponent } from './modules/thongtin-taikhoan/thongtin-taikhoan.component';
import { ChitietTrangthaiDonhangComponent } from './modules/chitiet-trangthai-donhang/chitiet-trangthai-donhang.component';

@NgModule({
  declarations: [
    AppComponent, NotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule,
    FooterModule,
    HeaderModule,
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
