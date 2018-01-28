import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/pages/home/home.module#HomeModule',
  },
  {
    path: 'login',
    loadChildren: 'app/pages/login-redirect/login#LoginModule',
  },
  {
    path: 'prediction',
    loadChildren: 'app/pages/prediction/prediction#PredictionModule'
  }
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(routes);
