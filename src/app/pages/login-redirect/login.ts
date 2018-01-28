import { Component, ModuleWithProviders, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettings } from '../../model/app-settings';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'login-redirect',
  template: ``,
})

export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    window.location.href = AppSettings.AUTH_ENDPOINT + '?endpoint=' + window.location;
  }
}

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  imports: [CommonModule, routing],
  declarations: [LoginComponent],
})

export class LoginModule {}
