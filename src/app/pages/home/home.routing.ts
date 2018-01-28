import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../../auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
];

export const HOME_ROUTING: ModuleWithProviders = RouterModule.forChild(routes);
