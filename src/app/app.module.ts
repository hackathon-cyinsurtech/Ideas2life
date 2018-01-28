import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { APP_ROUTING } from './app.routing';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { AuthGuard } from './auth-guard.service';
import { AppGlobals } from './model/app-globals';
import { LoginModule } from './pages/login-redirect/login';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    APP_ROUTING,
  ],
  providers: [AuthGuard, LocalStorageService, AppGlobals],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {
}
